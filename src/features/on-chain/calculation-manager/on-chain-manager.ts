import { forkJoin, from, map, merge, Observable, of, startWith, switchMap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { RubicSdkError } from 'src/common/errors';
import { PriceToken, PriceTokenAmount, Token } from 'src/common/tokens';
import { notNull } from 'src/common/utils/object';
import { combineOptions } from 'src/common/utils/options';
import pTimeout from 'src/common/utils/p-timeout';
import { BlockchainName, EvmBlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { BlockchainsInfo } from 'src/core/blockchain/utils/blockchains-info/blockchains-info';
import { ProviderAddress } from 'src/core/sdk/models/provider-address';
import { getPriceTokensFromInputTokens } from 'src/features/common/utils/get-price-tokens-from-input-tokens';
import { defaultProviderAddresses } from 'src/features/cross-chain/calculation-manager/constants/default-provider-addresses';
import { CrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/common/cross-chain-provider';
import { DeflationTokenManager } from 'src/features/deflation-token-manager/deflation-token-manager';
import { IsDeflationToken } from 'src/features/deflation-token-manager/models/is-deflation-token';
import { typedTradeProviders } from 'src/features/on-chain/calculation-manager/constants/trade-providers/typed-trade-providers';
import { OnChainManagerCalculationOptions } from 'src/features/on-chain/calculation-manager/models/on-chain-manager-calculation-options';
import { OnChainReactivelyCalculatedTradeData } from 'src/features/on-chain/calculation-manager/models/on-chain-reactively-calculated-trade-data';
import { OnChainTradeError } from 'src/features/on-chain/calculation-manager/models/on-chain-trade-error';
import { OnChainTypedTradeProviders } from 'src/features/on-chain/calculation-manager/models/on-chain-typed-trade-provider';
import { RequiredOnChainManagerCalculationOptions } from 'src/features/on-chain/calculation-manager/models/required-on-chain-manager-calculation-options';
import { WrappedOnChainTradeOrNull } from 'src/features/on-chain/calculation-manager/models/wrapped-on-chain-trade-or-null';
import { LifiProvider } from 'src/features/on-chain/calculation-manager/providers/aggregators/lifi/lifi-provider';
import { LifiCalculationOptions } from 'src/features/on-chain/calculation-manager/providers/aggregators/lifi/models/lifi-calculation-options';
import { OpenOceanProvider } from 'src/features/on-chain/calculation-manager/providers/aggregators/open-ocean/open-ocean-provider';
import { EvmWrapTrade } from 'src/features/on-chain/calculation-manager/providers/common/evm-wrap-trade/evm-wrap-trade';
import {
    OnChainCalculationOptions,
    RequiredOnChainCalculationOptions
} from 'src/features/on-chain/calculation-manager/providers/common/models/on-chain-calculation-options';
import {
    ON_CHAIN_TRADE_TYPE,
    OnChainTradeType
} from 'src/features/on-chain/calculation-manager/providers/common/models/on-chain-trade-type';
import { OnChainProxyService } from 'src/features/on-chain/calculation-manager/providers/common/on-chain-proxy-service/on-chain-proxy-service';
import { EvmOnChainTrade } from 'src/features/on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade';
import { OnChainTrade } from 'src/features/on-chain/calculation-manager/providers/common/on-chain-trade/on-chain-trade';
import { OnChainProvider } from 'src/features/on-chain/calculation-manager/providers/dexes/common/on-chain-provider/on-chain-provider';

import { RangoOnChainProvider } from './providers/aggregators/rango/rango-on-chain-provider';
import { SymbiosisOnChainProvider } from './providers/aggregators/symbiosis/symbiosis-on-chain-provider';
import { AggregatorOnChainProvider } from './providers/common/on-chain-aggregator/aggregator-on-chain-provider-abstract';

/**
 * Contains methods to calculate on-chain trades.
 */
export class OnChainManager {
    public static readonly defaultCalculationTimeout = 20_000;

    /**
     * List of all on-chain trade providers, combined by blockchains.
     */
    public readonly tradeProviders: OnChainTypedTradeProviders = typedTradeProviders;

    private readonly aggregators: AggregatorOnChainProvider[] = [
        new LifiProvider(),
        new OpenOceanProvider(),
        new RangoOnChainProvider(),
        new SymbiosisOnChainProvider()
    ];

    public readonly lifiProvider = new LifiProvider();

    public readonly openOceanProvider = new OpenOceanProvider();

    public readonly deflationTokenManager = new DeflationTokenManager();

    private readonly LIFI_DISABLED_PROVIDERS: OnChainTradeType[] = [];

    public constructor(private readonly providerAddress: ProviderAddress) {}

    public calculateTradeReactively(
        fromToken:
            | Token
            | {
                  address: string;
                  blockchain: BlockchainName;
              }
            | PriceToken,
        fromAmount: string | number,
        toToken: Token | string | PriceToken,
        options?: OnChainManagerCalculationOptions
    ): Observable<OnChainReactivelyCalculatedTradeData> {
        if (toToken instanceof Token && fromToken.blockchain !== toToken.blockchain) {
            throw new RubicSdkError('Blockchains of from and to tokens must be same');
        }

        return from(getPriceTokensFromInputTokens(fromToken, fromAmount.toString(), toToken)).pipe(
            switchMap(({ from, to }) =>
                forkJoin([of(from), of(to), this.getFullOptions(from, to, options)])
            ),
            switchMap(([from, to, fullOptions]) => {
                if ((from.isNative && to.isWrapped) || (from.isWrapped && to.isNative)) {
                    return this.getWrappedWrapTrade(from, to, fullOptions);
                }

                const nativeProviders = Object.entries(this.tradeProviders[from.blockchain]).filter(
                    ([type]) => !fullOptions.disabledProviders.includes(type as OnChainTradeType)
                ) as [OnChainTradeType, OnChainProvider][];

                const aggregatorsTrades = this.getAggregatorsCalculationPromises(
                    from,
                    to,
                    fullOptions
                );

                const totalTrades = [...nativeProviders, ...aggregatorsTrades].length;

                return merge(
                    ...nativeProviders.map(([_, provider]) =>
                        fromPromise(
                            this.getProviderCalculationPromise(provider, from, to, fullOptions)
                        )
                    ),
                    ...aggregatorsTrades
                ).pipe(
                    map((wrappedTrade, index) => ({
                        total: totalTrades,
                        calculated: index + 1,
                        wrappedTrade: wrappedTrade || null
                    })),
                    startWith({
                        total: totalTrades,
                        calculated: 0,
                        wrappedTrade: null
                    })
                );
            })
        );
    }

    /**
     * Calculates on-chain trades, sorted by output amount.
     *
     * @example
     * ```ts
     * const blockchain = BLOCKCHAIN_NAME.ETHEREUM;
     * // ETH
     * const fromTokenAddress = '0x0000000000000000000000000000000000000000';
     * const fromAmount = 1;
     * // USDT
     * const toTokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
     *
     * const trades = await sdk.onChainManager.calculateTrade(
     *     { blockchain, address: fromTokenAddress },
     *     fromAmount,
     *     toTokenAddress
     * );
     * const bestTrade = trades[0];
     *
     * trades.forEach(trade => {
     *     if (trade instanceof OnChainTrade) {
     *         console.log(trade.type, `to amount: ${trade.to.tokenAmount.toFormat(3)}`)
     *     }
     * })
     * ```
     *
     * @param fromToken Token to sell.
     * @param fromAmount Amount to sell.
     * @param toToken Token to get.
     * @param options Additional options.
     * @returns List of calculated on-chain trades.
     */
    public async calculateTrade(
        fromToken:
            | Token
            | {
                  address: string;
                  blockchain: BlockchainName;
              }
            | PriceToken,
        fromAmount: string | number,
        toToken: Token | string | PriceToken,
        options?: OnChainManagerCalculationOptions
    ): Promise<Array<OnChainTrade | OnChainTradeError>> {
        if (toToken instanceof Token && fromToken.blockchain !== toToken.blockchain) {
            throw new RubicSdkError('Blockchains of from and to tokens must be same');
        }

        const { from, to } = await getPriceTokensFromInputTokens(
            fromToken,
            fromAmount.toString(),
            toToken
        );

        const fullOptions = await this.getFullOptions(from, to, options);
        return this.calculateTradeFromTokens(from, to, fullOptions);
    }

    private async getFullOptions(
        from: PriceTokenAmount,
        to: PriceToken,
        options?: OnChainManagerCalculationOptions
    ): Promise<RequiredOnChainManagerCalculationOptions> {
        const chainType = BlockchainsInfo.getChainType(from.blockchain) as keyof ProviderAddress;

        const [isDeflationFrom, isDeflationTo] = await Promise.all([
            this.isDeflationToken(from),
            this.isDeflationToken(to)
        ]);
        let useProxy: boolean;
        if (options?.useProxy === false) {
            useProxy = options.useProxy;
        } else {
            useProxy =
                OnChainProxyService.isSupportedBlockchain(from.blockchain) &&
                (!isDeflationFrom.isDeflation || isDeflationFrom.isWhitelisted);
        }

        return combineOptions<RequiredOnChainManagerCalculationOptions>(
            { ...options, useProxy },
            {
                timeout: OnChainManager.defaultCalculationTimeout,
                disabledProviders: [],
                providerAddress:
                    options?.providerAddress ||
                    this.providerAddress?.[chainType]?.onChain ||
                    defaultProviderAddresses.onChain,
                useProxy,
                withDeflation: {
                    from: isDeflationFrom,
                    to: isDeflationTo
                }
            }
        );
    }

    private async calculateTradeFromTokens(
        from: PriceTokenAmount,
        to: PriceToken,
        options: RequiredOnChainManagerCalculationOptions
    ): Promise<Array<OnChainTrade | OnChainTradeError>> {
        if ((from.isNative && to.isWrapped) || (from.isWrapped && to.isNative)) {
            return [OnChainManager.getWrapTrade(from, to, options)];
        }

        const dexesProviders = Object.entries(this.tradeProviders[from.blockchain]).filter(
            ([type]) => !options.disabledProviders.includes(type as OnChainTradeType)
        ) as [OnChainTradeType, OnChainProvider][];
        const dexesTradesPromise = this.calculateDexes(from, to, dexesProviders, options);
        const lifiTradePromise = this.calculateLifiTrade(from, to, options);
        const openOceanTradePromise = this.openOceanProvider.calculate(
            from as PriceTokenAmount<EvmBlockchainName>,
            to as PriceTokenAmount<EvmBlockchainName>,
            options as RequiredOnChainCalculationOptions
        );

        const allTrades = (
            await Promise.all([dexesTradesPromise, lifiTradePromise, openOceanTradePromise])
        ).flat();

        return allTrades.filter(notNull).sort((tradeA, tradeB) => {
            if (tradeA instanceof OnChainTrade || tradeB instanceof OnChainTrade) {
                if (tradeA instanceof OnChainTrade && tradeB instanceof OnChainTrade) {
                    return tradeA.to.tokenAmount.comparedTo(tradeB.to.tokenAmount);
                }
                return tradeA instanceof OnChainTrade ? 1 : -1;
            }
            return 0;
        }) as (OnChainTrade | OnChainTradeError)[];
    }

    private isDeflationToken(token: Token): Promise<IsDeflationToken> {
        return this.deflationTokenManager.isDeflationToken(token);
    }

    private async calculateDexes(
        from: PriceTokenAmount,
        to: PriceToken,
        dexesProviders: [OnChainTradeType, OnChainProvider][],
        options: RequiredOnChainManagerCalculationOptions
    ): Promise<Array<OnChainTrade | OnChainTradeError>> {
        return Promise.all(
            dexesProviders.map(async ([type, provider]) => {
                try {
                    return await pTimeout(provider.calculate(from, to, options), options.timeout);
                } catch (e) {
                    console.debug(
                        `[RUBIC_SDK] Trade calculation error occurred for ${type} trade provider.`,
                        e
                    );
                    return { type, error: e };
                }
            })
        );
    }

    private async calculateLifiTrade(
        from: PriceTokenAmount,
        to: PriceToken,
        options: RequiredOnChainManagerCalculationOptions
    ): Promise<OnChainTrade | OnChainTradeError> {
        try {
            const disabledProviders = [
                ...this.LIFI_DISABLED_PROVIDERS,
                ...options.disabledProviders
            ];

            const calculationOptions: LifiCalculationOptions = {
                ...options,
                slippageTolerance: options?.slippageTolerance!,
                gasCalculation: options.gasCalculation === 'disabled' ? 'disabled' : 'calculate',
                disabledProviders
            };

            const lifiCalculationCall = this.lifiProvider.calculate(
                from as PriceTokenAmount<EvmBlockchainName>,
                to as PriceTokenAmount<EvmBlockchainName>,
                calculationOptions
            );

            return pTimeout(lifiCalculationCall, options.timeout);
        } catch (err) {
            console.debug('[RUBIC_SDK] Trade calculation error occurred for lifi.', err);
            return { type: ON_CHAIN_TRADE_TYPE.LIFI, error: err };
        }
    }

    public static getWrapTrade(
        from: PriceTokenAmount,
        to: PriceToken,
        options: OnChainCalculationOptions
    ): EvmOnChainTrade {
        const fromToken = from as PriceTokenAmount<EvmBlockchainName>;
        const toToken = to as PriceToken<EvmBlockchainName>;
        return new EvmWrapTrade(
            {
                from: fromToken,
                to: new PriceTokenAmount<EvmBlockchainName>({
                    ...toToken.asStruct,
                    weiAmount: from.weiAmount
                }),
                slippageTolerance: 0,
                path: [from, to],
                gasFeeInfo: null,
                useProxy: false,
                proxyFeeInfo: undefined,
                fromWithoutFee: fromToken,

                withDeflation: {
                    from: { isDeflation: false },
                    to: { isDeflation: false }
                }
            },
            options.providerAddress!
        );
    }

    private async getProviderCalculationPromise(
        provider: OnChainProvider,
        from: PriceTokenAmount,
        to: PriceToken,
        options: RequiredOnChainManagerCalculationOptions
    ): Promise<WrappedOnChainTradeOrNull> {
        try {
            const wrappedTrade = await pTimeout(
                provider.calculate(from, to, options),
                options.timeout
            );
            if (!wrappedTrade) {
                return null;
            }

            return {
                trade: wrappedTrade,
                tradeType: provider.type
            };
        } catch (err: unknown) {
            console.debug(
                `[RUBIC_SDK] Trade calculation error occurred for ${provider.type} trade provider.`,
                err
            );
            return {
                trade: null,
                tradeType: provider.type,
                error: CrossChainProvider.parseError(err)
            };
        }
    }

    private getAggregatorsCalculationPromises(
        from: PriceTokenAmount,
        to: PriceToken,
        options: RequiredOnChainManagerCalculationOptions
    ): Array<Promise<WrappedOnChainTradeOrNull>> {
        const availableAggregators = this.aggregators.filter(aggregator => {
            return !this.isDisabledAggregator(options.disabledProviders, aggregator.tradeType);
        });

        const promises = availableAggregators.map(async aggregator => {
            try {
                let wrappedTrade: OnChainTrade | OnChainTradeError;

                if (aggregator.tradeType === ON_CHAIN_TRADE_TYPE.LIFI) {
                    wrappedTrade = await this.calculateLifiTrade(from, to, options);
                } else {
                    wrappedTrade = await pTimeout(
                        aggregator.calculate(
                            from as PriceTokenAmount<EvmBlockchainName>,
                            to as PriceTokenAmount<EvmBlockchainName>,
                            options as RequiredOnChainCalculationOptions
                        ),
                        options.timeout
                    );
                }

                if ('error' in wrappedTrade) {
                    throw wrappedTrade.error;
                }

                if (!wrappedTrade) {
                    return null;
                }

                return { trade: wrappedTrade, tradeType: aggregator.tradeType };
            } catch (err) {
                console.debug(
                    `[RUBIC_SDK] Trade calculation error occurred for ${aggregator.tradeType} trade provider.`,
                    err
                );

                return {
                    trade: null,
                    tradeType: aggregator.tradeType,
                    error: CrossChainProvider.parseError(err)
                };
            }
        });

        return promises;
    }

    private isDisabledAggregator(
        disabledProviders: OnChainTradeType[],
        provider: OnChainTradeType
    ): boolean {
        return disabledProviders.map(provider => provider.toUpperCase()).includes(provider);
    }

    private getWrappedWrapTrade(
        fromToken: PriceTokenAmount,
        toToken: PriceToken,
        fullOptions: RequiredOnChainManagerCalculationOptions
    ) {
        const wrappedTrade: WrappedOnChainTradeOrNull = {
            error: undefined,
            trade: null,
            tradeType: ON_CHAIN_TRADE_TYPE.WRAPPED
        };
        try {
            wrappedTrade.trade = OnChainManager.getWrapTrade(fromToken, toToken, fullOptions);
        } catch (err: unknown) {
            wrappedTrade.error = err as RubicSdkError;
        }
        return of({
            total: 1,
            calculated: 1,
            wrappedTrade
        });
    }
}
