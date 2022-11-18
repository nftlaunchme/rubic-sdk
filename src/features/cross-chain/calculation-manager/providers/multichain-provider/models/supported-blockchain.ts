import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

export const multichainCrossChainSupportedBlockchains = [
    BLOCKCHAIN_NAME.ETHEREUM,
    BLOCKCHAIN_NAME.POLYGON,
    BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    BLOCKCHAIN_NAME.AVALANCHE,
    BLOCKCHAIN_NAME.MOONRIVER,
    BLOCKCHAIN_NAME.FANTOM,
    BLOCKCHAIN_NAME.HARMONY,
    BLOCKCHAIN_NAME.ARBITRUM,
    BLOCKCHAIN_NAME.AURORA,
    BLOCKCHAIN_NAME.TELOS,
    BLOCKCHAIN_NAME.OPTIMISM,
    BLOCKCHAIN_NAME.CRONOS,
    BLOCKCHAIN_NAME.OKE_X_CHAIN,
    BLOCKCHAIN_NAME.GNOSIS,
    BLOCKCHAIN_NAME.FUSE,
    BLOCKCHAIN_NAME.MOONBEAM,
    BLOCKCHAIN_NAME.CELO,
    BLOCKCHAIN_NAME.BOBA,
    BLOCKCHAIN_NAME.KAVA,
    BLOCKCHAIN_NAME.BITGERT,
    BLOCKCHAIN_NAME.OASIS,
    BLOCKCHAIN_NAME.METIS,
    BLOCKCHAIN_NAME.DFK
] as const;

export type MultichainCrossChainSupportedBlockchain =
    typeof multichainCrossChainSupportedBlockchains[number];
