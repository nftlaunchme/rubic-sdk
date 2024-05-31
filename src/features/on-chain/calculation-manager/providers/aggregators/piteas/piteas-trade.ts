import BigNumber from 'bignumber.js';
import { RubicSdkError } from 'src/common/errors';
import { EvmEncodeConfig } from 'src/core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config';
import { Web3Pure } from 'src/core/blockchain/web3-pure/web3-pure';
import { Injector } from 'src/core/injector/injector';
import { EncodeTransactionOptions } from 'src/features/common/models/encode-transaction-options';
import { rubicProxyContractAddress } from 'src/features/cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address';
import { piteasRouterAddress } from 'src/features/on-chain/calculation-manager/providers/aggregators/piteas/constants/piteas-router-address';
import {
    PiteasMethodParameters,
    PiteasQuoteRequestParams
} from 'src/features/on-chain/calculation-manager/providers/aggregators/piteas/models/piteas-quote';
import { PiteasTradeStruct } from 'src/features/on-chain/calculation-manager/providers/aggregators/piteas/models/piteas-trade-struct';
import { PiteasApiService } from 'src/features/on-chain/calculation-manager/providers/aggregators/piteas/piteas-api-service';
import { OnChainProxyFeeInfo } from 'src/features/on-chain/calculation-manager/providers/common/models/on-chain-proxy-fee-info';
import {
    ON_CHAIN_TRADE_TYPE,
    OnChainTradeType
} from 'src/features/on-chain/calculation-manager/providers/common/models/on-chain-trade-type';
import { AggregatorEvmOnChainTrade } from 'src/features/on-chain/calculation-manager/providers/common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract';
import { GetToAmountAndTxDataResponse } from 'src/features/on-chain/calculation-manager/providers/common/on-chain-aggregator/models/aggregator-on-chain-types';
import { EvmOnChainTradeStruct } from 'src/features/on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct';

export class PiteasTrade extends AggregatorEvmOnChainTrade {
    public static async getGasLimit(
        tradeStruct: EvmOnChainTradeStruct,
        providerGateway: string,
        methodParameters: PiteasMethodParameters
    ): Promise<BigNumber | null> {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress =
            Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }

        try {
            const web3Public = Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = await web3Public.getEstimatedGasByData(
                walletAddress,
                providerGateway,
                {
                    data: methodParameters.calldata,
                    value: methodParameters.value
                }
            );

            if (!gasLimit?.isFinite()) {
                return null;
            }
            return gasLimit;
        } catch (err) {
            console.debug(err);
            return null;
        }
    }

    public readonly type: OnChainTradeType = ON_CHAIN_TRADE_TYPE.PITEAS;

    public readonly providerGateway = piteasRouterAddress;

    private readonly quoteRequestParams: PiteasQuoteRequestParams;

    protected get spenderAddress(): string {
        return this.useProxy
            ? rubicProxyContractAddress[this.from.blockchain].gateway
            : this.providerGateway;
    }

    public get dexContractAddress(): string {
        return piteasRouterAddress;
    }

    private proxyFeeInfo: OnChainProxyFeeInfo | undefined;

    constructor(
        tradeStruct: PiteasTradeStruct,
        providerAddress: string,
        quoteRequestParams: PiteasQuoteRequestParams
    ) {
        super(tradeStruct, providerAddress);

        this.quoteRequestParams = quoteRequestParams;
        this.proxyFeeInfo = tradeStruct.proxyFeeInfo;
    }

    protected async getTransactionConfigAndAmount(
        options: EncodeTransactionOptions
    ): Promise<GetToAmountAndTxDataResponse> {
        const account = options.receiverAddress || options.fromAddress;
        try {
            const { destAmount, gasUseEstimate, methodParameters } =
                await PiteasApiService.fetchQuote({
                    ...this.quoteRequestParams,
                    account
                });

            const providerValue = new BigNumber(methodParameters.value);
            const value = providerValue.minus(
                providerValue.multipliedBy((this.proxyFeeInfo?.platformFee.percent || 0) / 100)
            );

            console.log('Provider value: ', Web3Pure.fromWei(value, this.from.decimals).toFixed());

            const tx: EvmEncodeConfig = {
                to: piteasRouterAddress,
                data: methodParameters.calldata,
                value: value.toString(),
                gas: gasUseEstimate.toString()
            };

            return {
                tx,
                toAmount: destAmount
            };
        } catch (error) {
            if ('statusCode' in error && 'message' in error) {
                throw new RubicSdkError(error.message);
            }
            throw error;
        }
    }
}
