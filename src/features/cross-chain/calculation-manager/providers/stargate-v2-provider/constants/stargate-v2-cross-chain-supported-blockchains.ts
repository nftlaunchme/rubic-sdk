import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

export const stargateV2SupportedBlockchains = [
    BLOCKCHAIN_NAME.ETHEREUM,
    BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    BLOCKCHAIN_NAME.POLYGON,
    BLOCKCHAIN_NAME.AVALANCHE,
    BLOCKCHAIN_NAME.ARBITRUM,
    BLOCKCHAIN_NAME.OPTIMISM,
    BLOCKCHAIN_NAME.METIS,
    BLOCKCHAIN_NAME.LINEA,
    BLOCKCHAIN_NAME.MANTLE,
    BLOCKCHAIN_NAME.BASE,
    BLOCKCHAIN_NAME.KAVA,
    BLOCKCHAIN_NAME.SCROLL,
    BLOCKCHAIN_NAME.AURORA,
    // BLOCKCHAIN_NAME.KLAYTN,
    BLOCKCHAIN_NAME.TAIKO,
    BLOCKCHAIN_NAME.SEI,
    BLOCKCHAIN_NAME.FLARE
    // BLOCKCHAIN_NAME.IOTA,
];

export type StargateV2SupportedBlockchains = (typeof stargateV2SupportedBlockchains)[number];
