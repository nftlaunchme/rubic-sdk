import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

export const lifiCrossChainSupportedBlockchains = [
    BLOCKCHAIN_NAME.ETHEREUM,
    BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    BLOCKCHAIN_NAME.POLYGON,
    BLOCKCHAIN_NAME.AVALANCHE,
    BLOCKCHAIN_NAME.FANTOM,
    BLOCKCHAIN_NAME.MOONRIVER,
    BLOCKCHAIN_NAME.ARBITRUM,
    BLOCKCHAIN_NAME.OPTIMISM,
    BLOCKCHAIN_NAME.GNOSIS,
    BLOCKCHAIN_NAME.FUSE,
    BLOCKCHAIN_NAME.MOONBEAM,
    BLOCKCHAIN_NAME.BASE,
    BLOCKCHAIN_NAME.POLYGON_ZKEVM,
    BLOCKCHAIN_NAME.ZK_SYNC,
    BLOCKCHAIN_NAME.LINEA,
    BLOCKCHAIN_NAME.MODE,
    BLOCKCHAIN_NAME.SCROLL,
    BLOCKCHAIN_NAME.MANTLE,
    BLOCKCHAIN_NAME.ROOTSTOCK,
    BLOCKCHAIN_NAME.CELO,
    BLOCKCHAIN_NAME.BLAST,
    BLOCKCHAIN_NAME.AURORA
] as const;

export type LifiCrossChainSupportedBlockchain = (typeof lifiCrossChainSupportedBlockchains)[number];
