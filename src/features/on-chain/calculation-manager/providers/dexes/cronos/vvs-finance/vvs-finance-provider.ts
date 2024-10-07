import { OnChainTradeType } from "../../../../core/blockchain/models/on-chain-trade-type";
import { UniswapV2AbstractProvider } from "../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";

export class VvsFinanceProvider extends UniswapV2AbstractProvider {
    public readonly type = OnChainTradeType.VVS_FINANCE;

    public readonly providerSettings = {
        routingProviderId: 'vvs-finance',
        liquidityProviderName: 'VVS Finance'
    };
}
