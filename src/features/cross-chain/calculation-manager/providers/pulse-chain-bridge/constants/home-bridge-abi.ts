import { AbiItem } from 'web3-utils';

export const homeBridgeAbi: AbiItem[] = [
    {
        inputs: [
            {
                internalType: 'string',
                name: '_suffix',
                type: 'string'
            }
        ],
        type: 'constructor'
    },
    {
        inputs: [],
        name: 'bridgeContract',
        outputs: [
            {
                internalType: 'contract IAMB',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_nativeToken',
                type: 'address'
            }
        ],
        name: 'bridgedTokenAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_to',
                type: 'address'
            }
        ],
        name: 'claimTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_bridgedToken',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_to',
                type: 'address'
            }
        ],
        name: 'claimTokensFromTokenContract',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'dailyLimit',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'string',
                name: '_name',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_symbol',
                type: 'string'
            },
            {
                internalType: 'uint8',
                name: '_decimals',
                type: 'uint8'
            },
            {
                internalType: 'address',
                name: '_recipient',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'deployAndHandleBridgedTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'string',
                name: '_name',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_symbol',
                type: 'string'
            },
            {
                internalType: 'uint8',
                name: '_decimals',
                type: 'uint8'
            },
            {
                internalType: 'address',
                name: '_recipient',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: '_data',
                type: 'bytes'
            }
        ],
        name: 'deployAndHandleBridgedTokensAndCall',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'executionDailyLimit',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'executionMaxPerTx',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'feeManager',
        outputs: [
            {
                internalType: 'contract OmnibridgeFeeManager',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_messageId',
                type: 'bytes32'
            }
        ],
        name: 'fixFailedMessage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address'
            }
        ],
        name: 'fixMediatorBalance',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_homeToken',
                type: 'address'
            }
        ],
        name: 'foreignTokenAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'forwardingRulesManager',
        outputs: [
            {
                internalType: 'contract MultiTokenForwardingRulesManager',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'gasLimitManager',
        outputs: [
            {
                internalType: 'contract SelectorTokenGasLimitManager',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getBridgeInterfacesVersion',
        outputs: [
            {
                internalType: 'uint64',
                name: 'major',
                type: 'uint64'
            },
            {
                internalType: 'uint64',
                name: 'minor',
                type: 'uint64'
            },
            {
                internalType: 'uint64',
                name: 'patch',
                type: 'uint64'
            }
        ],
        stateMutability: 'pure',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getBridgeMode',
        outputs: [
            {
                internalType: 'bytes4',
                name: '_data',
                type: 'bytes4'
            }
        ],
        stateMutability: 'pure',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getCurrentDay',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_recipient',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'handleBridgedTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_recipient',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: '_data',
                type: 'bytes'
            }
        ],
        name: 'handleBridgedTokensAndCall',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_recipient',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'handleNativeTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_recipient',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: '_data',
                type: 'bytes'
            }
        ],
        name: 'handleNativeTokensAndCall',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_foreignToken',
                type: 'address'
            }
        ],
        name: 'homeTokenAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_bridgeContract',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_mediatorContract',
                type: 'address'
            },
            {
                internalType: 'uint256[3]',
                name: '_dailyLimitMaxPerTxMinPerTxArray',
                type: 'uint256[3]'
            },
            {
                internalType: 'uint256[2]',
                name: '_executionDailyLimitExecutionMaxPerTxArray',
                type: 'uint256[2]'
            },
            {
                internalType: 'address',
                name: '_gasLimitManager',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_owner',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_tokenFactory',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_feeManager',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_forwardingRulesManager',
                type: 'address'
            }
        ],
        name: 'initialize',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'isBridgedTokenDeployAcknowledged',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'isInitialized',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'isRegisteredAsNativeToken',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'isTokenRegistered',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'maxAvailablePerTx',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'maxPerTx',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'mediatorBalance',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'mediatorContractOnOtherSide',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_messageId',
                type: 'bytes32'
            }
        ],
        name: 'messageFixed',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            }
        ],
        name: 'minPerTx',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_bridgedToken',
                type: 'address'
            }
        ],
        name: 'nativeTokenAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_from',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: '_data',
                type: 'bytes'
            }
        ],
        name: 'onTokenTransfer',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'contract IERC677',
                name: 'token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'relayTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'contract IERC677',
                name: 'token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'relayTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'contract IERC677',
                name: 'token',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: '_data',
                type: 'bytes'
            }
        ],
        name: 'relayTokensAndCall',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_messageId',
                type: 'bytes32'
            }
        ],
        name: 'requestFailedMessageFix',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_bridgeContract',
                type: 'address'
            }
        ],
        name: 'setBridgeContract',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_nativeToken',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_bridgedToken',
                type: 'address'
            }
        ],
        name: 'setCustomTokenAddressPair',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_dailyLimit',
                type: 'uint256'
            }
        ],
        name: 'setDailyLimit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_dailyLimit',
                type: 'uint256'
            }
        ],
        name: 'setExecutionDailyLimit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_maxPerTx',
                type: 'uint256'
            }
        ],
        name: 'setExecutionMaxPerTx',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_feeManager',
                type: 'address'
            }
        ],
        name: 'setFeeManager',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_manager',
                type: 'address'
            }
        ],
        name: 'setForwardingRulesManager',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_manager',
                type: 'address'
            }
        ],
        name: 'setGasLimitManager',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_maxPerTx',
                type: 'uint256'
            }
        ],
        name: 'setMaxPerTx',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_mediatorContract',
                type: 'address'
            }
        ],
        name: 'setMediatorContractOnOtherSide',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_minPerTx',
                type: 'uint256'
            }
        ],
        name: 'setMinPerTx',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_tokenFactory',
                type: 'address'
            }
        ],
        name: 'setTokenFactory',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'tokenFactory',
        outputs: [
            {
                internalType: 'contract TokenFactory',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_day',
                type: 'uint256'
            }
        ],
        name: 'totalExecutedPerDay',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_day',
                type: 'uint256'
            }
        ],
        name: 'totalSpentPerDay',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address'
            }
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_tokenFactory',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_forwardingRulesManager',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_gasLimitManager',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_dailyLimit',
                type: 'uint256'
            }
        ],
        name: 'upgradeToReverseMode',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256'
            }
        ],
        name: 'withinExecutionLimit',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256'
            }
        ],
        name: 'withinLimit',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'token',
                type: 'address'
            },
            {
                indexed: false,
                name: 'newLimit',
                type: 'uint256'
            }
        ],
        name: 'DailyLimitChanged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'token',
                type: 'address'
            },
            {
                indexed: false,
                name: 'newLimit',
                type: 'uint256'
            }
        ],
        name: 'ExecutionDailyLimitChanged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'messageId',
                type: 'bytes32'
            },
            {
                indexed: false,
                name: 'token',
                type: 'address'
            },
            {
                indexed: false,
                name: 'recipient',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ],
        name: 'FailedMessageFixed',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: 'fee',
                type: 'uint256'
            },
            {
                indexed: true,
                name: 'token',
                type: 'address'
            },
            {
                indexed: true,
                name: 'messageId',
                type: 'bytes32'
            }
        ],
        name: 'FeeDistributed',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'token',
                type: 'address'
            },
            {
                indexed: false,
                name: 'fee',
                type: 'uint256'
            }
        ],
        name: 'FeeDistributionFailed',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'nativeToken',
                type: 'address'
            },
            {
                indexed: true,
                name: 'bridgedToken',
                type: 'address'
            }
        ],
        name: 'NewTokenRegistered',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: 'previousOwner',
                type: 'address'
            },
            {
                indexed: false,
                name: 'newOwner',
                type: 'address'
            }
        ],
        name: 'OwnershipTransferred',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'token',
                type: 'address'
            },
            {
                indexed: true,
                name: 'recipient',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            },
            {
                indexed: true,
                name: 'messageId',
                type: 'bytes32'
            }
        ],
        name: 'TokensBridged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'token',
                type: 'address'
            },
            {
                indexed: true,
                name: 'sender',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            },
            {
                indexed: true,
                name: 'messageId',
                type: 'bytes32'
            }
        ],
        name: 'TokensBridgingInitiated',
        type: 'event'
    }
];
