import { RubicSdkError } from 'src/common/errors';
import { PriceTokenAmount } from 'src/common/tokens';
import { EvmBlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { blockchainId } from 'src/core/blockchain/utils/blockchains-info/constants/blockchain-id';
import { Injector } from 'src/core/injector/injector';

import {
    OwlToAllChainsResponse,
    OwlToSwappingChainsInfo,
    OwlToTokenInfo,
    OwlToTokensResponse,
    OwlToTransferFeeParams,
    OwlToTransferFeeResponse,
    OwlToTxInfoParams,
    OwlToTxInfoResponse
} from '../models/owl-to-api-types';

export class OwlToApiService {
    private static apiUrl = 'https://owlto.finance/';

    public static async getTxInfo(p: OwlToTxInfoParams): Promise<OwlToTxInfoResponse['msg']> {
        const { msg } = await Injector.httpClient.get<OwlToTxInfoResponse>(
            `${this.apiUrl}/api/lp-info`,
            {
                params: {
                    token: p.tokenSymbol,
                    from_chainid: p.sourceChainId,
                    to_chainid: p.targetChainId,
                    user: p.walletAddress,
                    to_user_address: p.walletAddress
                }
            }
        );

        return msg;
    }

    public static async getTransferFee(p: OwlToTransferFeeParams): Promise<string> {
        const { msg: fee } = await Injector.httpClient.get<OwlToTransferFeeResponse>(
            `${this.apiUrl}/api/dynamic-dtc`,
            {
                params: {
                    from: p.sourceChainName,
                    to: p.targetChainName,
                    amount: p.fromAmount,
                    token: p.tokenSymbol
                }
            }
        );

        return fee;
    }

    public static async getSwappingChainsInfo(
        sourceChainId: number,
        targetChainId: number
    ): Promise<OwlToSwappingChainsInfo> {
        const { msg: chains } = await Injector.httpClient.get<OwlToAllChainsResponse>(
            `${this.apiUrl}/api/config/all-chains`
        );

        const sourceChain = chains.find(c => c.chainId === sourceChainId);
        const targetChain = chains.find(c => c.chainId === targetChainId);

        if (!sourceChain || !targetChain) {
            throw new RubicSdkError('[OWL_TO_BRIDGE] Unsupported chain!');
        }

        return { sourceChain, targetChain };
    }

    public static async getSourceTokenInfo(
        sourceToken: PriceTokenAmount<EvmBlockchainName>
    ): Promise<OwlToTokenInfo> {
        const sourceChainId = blockchainId[sourceToken.blockchain];

        const { msg: tokens } = await Injector.httpClient.get<OwlToTokensResponse>(
            `${this.apiUrl}/api/config/filter-from-to-chains`,
            {
                params: {
                    token: sourceToken.symbol,
                    base_chainid: sourceChainId
                }
            }
        );

        const foundToken = tokens.find(t => {
            const sourceSymbolToLow = sourceToken.symbol.toLowerCase();
            const tSymbolToLow = t.symbol.toLowerCase();
            const sourceAddrToLow = sourceToken.address.toLowerCase();
            const tAddrToLow = t.fromAddress.toLowerCase();

            if (tAddrToLow === sourceAddrToLow) {
                return true;
            }
            if (sourceSymbolToLow.includes(tSymbolToLow) && t.fromChainId === sourceChainId) {
                return true;
            }
            return false;
        });

        if (!foundToken) {
            throw new RubicSdkError('[OWL_TO_BRIDGE] Unsupported token!');
        }

        return foundToken;
    }
}
