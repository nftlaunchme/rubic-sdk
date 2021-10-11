export interface SwapTransactionOptions {
    onConfirm?: (hash: string) => void;
    onApprove?: (hash: string | null) => void;
    gasPrice?: string | null;
    gasLimit?: string | null;
}

export interface SwapTransactionOptionsWithGasLimit extends SwapTransactionOptions {
    gasLimit: string;
}
