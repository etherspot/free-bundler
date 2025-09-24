import {
    createPaymasterClient,
    toSimple7702SmartAccount,
    ToSimple7702SmartAccountReturnType
} from "viem/account-abstraction";
import { createFreeBundler } from "../../src/client.js"
import { privateKeyToAccount } from "viem/accounts";
import {
    http,
    parseUnits,
    publicActions,
    walletActions,
    SignAuthorizationReturnType,
    Hex,
    Chain
} from "viem";

export default async (
    {
        chain,
        paymasterContext,
        paymasterUrl,
        privateKey,
        rpcUrl
    }:
    {
        chain: Chain,
        privateKey: Hex,
        rpcUrl?: string,
        paymasterUrl?: string,
        paymasterContext?: string
    }
) => {
    const owner = privateKeyToAccount(privateKey);

    const bundlerClient = createFreeBundler({chain})
                            .extend(walletActions)
                            .extend(publicActions);

    const smartAccount: ToSimple7702SmartAccountReturnType = await toSimple7702SmartAccount({
        client: bundlerClient,
        owner,
    });

    console.log("wallet:: ", smartAccount.address);

    // check sender's code to decide if eip7702Auth tuple is necessary for userOp.
    const senderCode = await bundlerClient.getCode({
        address: smartAccount.address
    });

    let authorization: SignAuthorizationReturnType | undefined;
    const { address: delegateAddress } = smartAccount.authorization;

    if(senderCode !== `0xef0100${delegateAddress.toLowerCase().substring(2)}`) {
        authorization = await bundlerClient.signAuthorization(smartAccount.authorization)
    }

    const paymasterClient = paymasterUrl ? createPaymasterClient({
        transport: http(paymasterUrl)
    }) : undefined;

    const userOpHash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        authorization,
        calls: [
            {to: "0x09FD4F6088f2025427AB1e89257A44747081Ed59", value: parseUnits('0.0000001', 18)}
        ],
        paymaster: paymasterClient,
        paymasterContext: paymasterContext ? JSON.parse(paymasterContext) : undefined,
    });

    console.log("userOpHash:: ", userOpHash);
    return userOpHash;
}
