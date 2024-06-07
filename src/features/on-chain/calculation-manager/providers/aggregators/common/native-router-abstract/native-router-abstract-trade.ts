import BigNumber from 'bignumber.js';
import { RubicSdkError } from 'src/common/errors';
import { EvmEncodeConfig } from 'src/core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config';
import { Injector } from 'src/core/injector/injector';
import { EncodeTransactionOptions } from 'src/features/common/models/encode-transaction-options';
import { rubicProxyContractAddress } from 'src/features/cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address';

import { ON_CHAIN_TRADE_TYPE } from '../../../common/models/on-chain-trade-type';
import { AggregatorEvmOnChainTrade } from '../../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract';
import { GetToAmountAndTxDataResponse } from '../../../common/on-chain-aggregator/models/aggregator-on-chain-types';
import { NativeRouterQuoteRequestParams } from './models/native-router-quote';
import {
    NativeRouterTradeInstance,
    NativeRouterTradeStruct
} from './models/native-router-trade-struct';
import { NativeRouterApiService } from './services/native-router-api-service';

export abstract class NativeRouterAbstractTrade extends AggregatorEvmOnChainTrade {
    public static async getGasLimit(
        tradeStruct: NativeRouterTradeStruct,
        providerGateway: string
    ): Promise<BigNumber | null> {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress =
            Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;

        if (!walletAddress) return null;

        try {
            const web3public = Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = await web3public.getEstimatedGasByData(
                walletAddress,
                providerGateway,
                {
                    data: tradeStruct.txRequest.calldata,
                    value: tradeStruct.txRequest.value
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

    public readonly type = ON_CHAIN_TRADE_TYPE.NATIVE_ROUTER;

    public readonly providerGateway: string;

    private readonly nativeRouterQuoteParams: NativeRouterQuoteRequestParams;

    protected get spenderAddress(): string {
        return this.useProxy
            ? rubicProxyContractAddress[this.from.blockchain].gateway
            : this.providerGateway;
    }

    public get dexContractAddress(): string {
        throw new RubicSdkError('Dex address is unknown before swap is started');
    }

    constructor(tradeInstance: NativeRouterTradeInstance) {
        super(tradeInstance.tradeStruct, tradeInstance.providerAddress);
        this.providerGateway = tradeInstance.providerGateway;
        this.nativeRouterQuoteParams = tradeInstance.nativeRouterQuoteParams;
    }

    protected async getTransactionConfigAndAmount(
        options: EncodeTransactionOptions
    ): Promise<GetToAmountAndTxDataResponse> {
        const account = options.receiverAddress || options.fromAddress;
        try {
            const { amountOut, txRequest } = await NativeRouterApiService.getFirmQuote({
                ...this.nativeRouterQuoteParams,
                fromAddress: account
            });

            const tx: EvmEncodeConfig = {
                to: txRequest.target,
                data: txRequest.calldata,
                value: txRequest.value
            };

            return {
                tx,
                toAmount: amountOut
            };
        } catch (err) {
            if ('statusCode' in err && 'message' in err) {
                throw new RubicSdkError(err.message);
            }
            throw err;
        }
    }
}
