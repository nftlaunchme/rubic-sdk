import BigNumber from 'bignumber.js';
import { PriceToken } from 'src/common/tokens';
import { BLOCKCHAIN_NAME, EvmBlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { Web3Pure } from 'src/core/blockchain/web3-pure/web3-pure';
import { Injector } from 'src/core/injector/injector';

import { EDDY_OMNI_CONTRACT_IN_ZETACHAIN } from '../constants/eddy-bridge-contract-addresses';
import { EDDY_BRIDGE_ABI } from '../constants/edyy-bridge-abi';
import { ZRC_20_ABI } from '../constants/zrc-20-token-abi';
import { findCompatibleZrc20TokenAddress } from '../utils/find-transit-token-address';

export class EddyBridgeContractService {
    public static async getPlatformFee(): Promise<number> {
        try {
            const web3Public = Injector.web3PublicService.getWeb3Public(BLOCKCHAIN_NAME.ZETACHAIN);
            const res = await web3Public.callContractMethod<number>(
                EDDY_OMNI_CONTRACT_IN_ZETACHAIN,
                EDDY_BRIDGE_ABI,
                'platformFee',
                []
            );
            // eddy currently takes 1% from bridged amount (platformFee = 10, ratioToAmount in than case = 0.99)
            return res / 1_000;
        } catch (err) {
            return 0;
        }
    }

    /**
     * @param token source chain token
     */
    public static async getGasInTargetChain(
        token: PriceToken<EvmBlockchainName>
    ): Promise<BigNumber> {
        const zrc20Token =
            token.blockchain === BLOCKCHAIN_NAME.ZETACHAIN
                ? token
                : await PriceToken.createToken({
                      address: findCompatibleZrc20TokenAddress(token),
                      blockchain: BLOCKCHAIN_NAME.ZETACHAIN
                  });

        const web3Public = Injector.web3PublicService.getWeb3Public(BLOCKCHAIN_NAME.ZETACHAIN);
        const res = await web3Public.callContractMethod<[string, string]>(
            zrc20Token.address,
            ZRC_20_ABI,
            'withdrawGasFee',
            []
        );
        // 18 decimals cause they send always gas-fee in Eth format
        const gasFeeNonWei = Web3Pure.fromWei(res?.[1] || 0, 18);

        return gasFeeNonWei;
    }

    /**
     * @returns eddy static slippage
     */
    public static async getEddySlipage(): Promise<number> {
        const web3Public = Injector.web3PublicService.getWeb3Public(BLOCKCHAIN_NAME.ZETACHAIN);
        const res = await web3Public.callContractMethod<number>(
            EDDY_OMNI_CONTRACT_IN_ZETACHAIN,
            EDDY_BRIDGE_ABI,
            'slippage',
            []
        );
        // if res equals to 10 then 10 / 1000 = 1%
        return res / 1_000;
    }
}
