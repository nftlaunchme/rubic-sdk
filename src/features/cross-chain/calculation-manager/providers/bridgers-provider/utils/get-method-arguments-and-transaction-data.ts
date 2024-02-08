import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from 'src/common/tokens';
import { BlockchainsInfo } from 'src/core/blockchain/utils/blockchains-info/blockchains-info';
import { blockchainId } from 'src/core/blockchain/utils/blockchains-info/constants/blockchain-id';
import { TronWeb3Pure } from 'src/core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure';
import { Web3Pure } from 'src/core/blockchain/web3-pure/web3-pure';
import { Injector } from 'src/core/injector/injector';
import { bridgersNativeAddress } from 'src/features/common/providers/bridgers/constants/bridgers-native-address';
import { toBridgersBlockchain } from 'src/features/common/providers/bridgers/constants/to-bridgers-blockchain';
import {
    BridgersQuoteRequest,
    BridgersQuoteResponse
} from 'src/features/common/providers/bridgers/models/bridgers-quote-api';
import {
    BridgersSwapRequest,
    BridgersSwapResponse
} from 'src/features/common/providers/bridgers/models/bridgers-swap-api';
import { createTokenNativeAddressProxy } from 'src/features/common/utils/token-native-address-proxy';
import { BridgersCrossChainSupportedBlockchain } from 'src/features/cross-chain/calculation-manager/providers/bridgers-provider/constants/bridgers-cross-chain-supported-blockchain';
import { EvmBridgersTransactionData } from 'src/features/cross-chain/calculation-manager/providers/bridgers-provider/evm-bridgers-trade/models/evm-bridgers-transaction-data';
import { TronBridgersTransactionData } from 'src/features/cross-chain/calculation-manager/providers/bridgers-provider/tron-bridgers-trade/models/tron-bridgers-transaction-data';
import { EvmCrossChainTrade } from 'src/features/cross-chain/calculation-manager/providers/common/emv-cross-chain-trade/evm-cross-chain-trade';
import { GetContractParamsOptions } from 'src/features/cross-chain/calculation-manager/providers/common/models/get-contract-params-options';
import { MarkRequired } from 'ts-essentials';

export async function getMethodArgumentsAndTransactionData<
    T extends EvmBridgersTransactionData | TronBridgersTransactionData
>(
    from: PriceTokenAmount<BridgersCrossChainSupportedBlockchain>,
    fromWithoutFee: PriceTokenAmount<BridgersCrossChainSupportedBlockchain>,
    to: PriceTokenAmount<BridgersCrossChainSupportedBlockchain>,
    toTokenAmountMin: BigNumber,
    walletAddress: string,
    providerAddress: string,
    options: MarkRequired<GetContractParamsOptions, 'receiverAddress'>
): Promise<{
    methodArguments: unknown[];
    transactionData: T;
}> {
    const amountOutMin = Web3Pure.toWei(toTokenAmountMin, to.decimals);
    const fromTokenAddress = createTokenNativeAddressProxy(
        fromWithoutFee,
        bridgersNativeAddress
    ).address;
    const toTokenAddress = createTokenNativeAddressProxy(to, bridgersNativeAddress).address;
    const fromAddress = options.fromAddress || walletAddress;
    const swapRequest: BridgersSwapRequest = {
        fromTokenAddress,
        toTokenAddress,
        fromAddress,
        toAddress: options.receiverAddress,
        fromTokenChain: toBridgersBlockchain[fromWithoutFee.blockchain],
        toTokenChain: toBridgersBlockchain[to.blockchain],
        fromTokenAmount: fromWithoutFee.stringWeiAmount,
        amountOutMin,
        equipmentNo: fromAddress.slice(0, 32),
        sourceFlag: 'rubic'
    };
    const quoteRequest: BridgersQuoteRequest = {
        fromTokenAddress,
        toTokenAddress,
        fromTokenAmount: fromWithoutFee.stringWeiAmount,
        fromTokenChain: toBridgersBlockchain[from.blockchain],
        toTokenChain: toBridgersBlockchain[to.blockchain]
    };

    const swapDataPromise = Injector.httpClient.post<BridgersSwapResponse<T>>(
        'https://sswap.swft.pro/api/sswap/swap',
        swapRequest
    );
    const quoteResponsePromise = Injector.httpClient.post<BridgersQuoteResponse>(
        'https://sswap.swft.pro/api/sswap/quote',
        quoteRequest
    );

    const [quoteResponse, swapData] = await Promise.allSettled([
        quoteResponsePromise,
        swapDataPromise
    ]);

    const transactionQuoteData =
        quoteResponse.status === 'fulfilled' && quoteResponse.value.data?.txData;
    const transactionSwapData = swapData.status === 'fulfilled' && swapData.value.data.txData;
    let transactionData;

    if (transactionSwapData && 'value' in transactionSwapData) {
        transactionData = transactionSwapData;
    } else {
        transactionData = { data: '', to: '', value: '' };
    }

    if (transactionQuoteData && transactionQuoteData.amountOutMin) {
        EvmCrossChainTrade.checkAmountChange(
            transactionData,
            transactionQuoteData.amountOutMin,
            toTokenAmountMin.toString()
        );
    }

    const dstTokenAddress = BlockchainsInfo.isTronBlockchainName(to.blockchain)
        ? TronWeb3Pure.addressToHex(to.address)
        : to.address;
    const receiverAddress = BlockchainsInfo.isTronBlockchainName(to.blockchain)
        ? TronWeb3Pure.addressToHex(options.receiverAddress)
        : options.receiverAddress;
    const methodArguments: unknown[] = [
        'native:bridgers',
        [
            from.address,
            from.stringWeiAmount,
            blockchainId[to.blockchain],
            dstTokenAddress,
            amountOutMin,
            receiverAddress,
            providerAddress,
            transactionData.to
        ]
    ];
    if (!from.isNative) {
        methodArguments.push(transactionData.to);
    }

    return {
        methodArguments,
        transactionData: transactionData as T
    };
}
