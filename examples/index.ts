import {argv} from "./args.js";
import { getChainById } from "./utils.js";
import sendSimple7702UserOp from "./accounts/simple7702.js";
import { Hex } from "viem";

export const main = async () => {
    const {
        chainId,
        rpcUrl,
        accountType,
        paymasterContext,
        paymasterUrl,
        privateKey
    } = argv;

    const chain = getChainById(chainId);

    switch(accountType) {
        case "simple7702":
            return sendSimple7702UserOp({
                chain,
                privateKey: privateKey as Hex,
                paymasterContext,
                paymasterUrl,
                rpcUrl
            })
        default:
            throw new Error(`Unsupported account type: ${accountType}`);
    }
}
main();
