import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

import { StargateV2SupportedBlockchains } from './stargate-v2-cross-chain-supported-blockchains';

export const stargateV2ChainIds: Record<StargateV2SupportedBlockchains, number> = {
    [BLOCKCHAIN_NAME.ETHEREUM]: 30101,
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: 30102,
    [BLOCKCHAIN_NAME.AVALANCHE]: 30106,
    [BLOCKCHAIN_NAME.POLYGON]: 30109,
    [BLOCKCHAIN_NAME.ARBITRUM]: 30110,
    [BLOCKCHAIN_NAME.OPTIMISM]: 30111,
    [BLOCKCHAIN_NAME.METIS]: 30151,
    [BLOCKCHAIN_NAME.LINEA]: 30183,
    [BLOCKCHAIN_NAME.MANTLE]: 30181,
    [BLOCKCHAIN_NAME.BASE]: 30184,
    [BLOCKCHAIN_NAME.KAVA]: 30177,
    [BLOCKCHAIN_NAME.SCROLL]: 30214,
    [BLOCKCHAIN_NAME.AURORA]: 30211
    // [BLOCKCHAIN_NAME.KLAYTN]: 30150,
    // [BLOCKCHAIN_NAME.IOTA]: 30284,
    // [BLOCKCHAIN_NAME.TAIKO]: 30290,
    // [BLOCKCHAIN_NAME.SEI]: 30280
};
