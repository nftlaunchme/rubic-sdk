import { UniswapV2AbstractProvider } from "../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { BLOCKCHAIN_NAME } from "../../../../core/blockchain/models/blockchain-name";

export class VvsFinanceProvider extends UniswapV2AbstractProvider {
    public readonly blockchain = BLOCKCHAIN_NAME.CRONOS;
    
    public readonly providerSettings = {
        allowedSlippages: [0.01, 0.03],
        routingProviderId: 'vvs-finance',
        liquidityProviderName: 'VVS Finance'
    };
}
