import { ZrxQuoteResponse } from 'src/features/on-chain/calculation-manager/providers/dexes/common/zrx-abstract/models/zrx-types';
import { EvmOnChainTradeStruct } from 'src/features/on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct';

export interface ZrxTradeStruct extends EvmOnChainTradeStruct {
    apiTradeData: ZrxQuoteResponse;
}
