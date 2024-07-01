import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

import { MesonSupportedBlockchain } from './meson-cross-chain-supported-chains';

export const mesonContractAddresses: Record<MesonSupportedBlockchain, string> = {
    [BLOCKCHAIN_NAME.ARBITRUM]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.AVALANCHE]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.AURORA]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.BASE]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.BLAST]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.CELO]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.CRONOS]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.ETHEREUM]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.FANTOM]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.GNOSIS]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.KAVA]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.LINEA]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.MANTA_PACIFIC]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.MANTLE]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.MERLIN]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.METIS]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.MODE]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.MOONBEAM]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.MOONRIVER]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.OPTIMISM]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.POLYGON]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.POLYGON_ZKEVM]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.SCROLL]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    // [BLOCKCHAIN_NAME.SOLANA]: 'FR1SDyLUj7PrMbtkUCkDrBymk5eWrRmr3UvWFb5Kjbmd',
    // [BLOCKCHAIN_NAME.TRON]: 'TKWqpzNucNNBMpfaE47F8CLhA8vzfNndH4',
    [BLOCKCHAIN_NAME.XLAYER]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.ZK_FAIR]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.ZK_LINK]: '0x2DcC88Fa6b6950EE28245C3238B8993BE5feeA42',
    [BLOCKCHAIN_NAME.ZK_SYNC]: '0x2DcC88Fa6b6950EE28245C3238B8993BE5feeA42',
    [BLOCKCHAIN_NAME.ZETACHAIN]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    [BLOCKCHAIN_NAME.CORE]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3',
    // @TODO add kroma contract
    [BLOCKCHAIN_NAME.KROMA]: ''
    // [BLOCKCHAIN_NAME.TAIKO]: '0x25aB3Efd52e6470681CE037cD546Dc60726948D3'
};
