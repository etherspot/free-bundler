import {
    createPaymasterClient,
    toSimple7702SmartAccount,
    ToSimple7702SmartAccountReturnType
} from "viem/account-abstraction";
// use import { createFreeBundler } from '@etherspot/free-bundler' when using it as a dependency.
import { createFreeBundler } from "../../src/client.js"; 
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
        implementation: "0xa46cc63eBF4Bd77888AA327837d20b23A63a56B5",
        client: bundlerClient,
        owner,
    });
    // overriding for ep9 address
    smartAccount.entryPoint.address = "0x433709009B8330FDa32311DF1C2AFA402eD8D009"

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
        // replace with your own calls
        calls: [
            {to: "0x09FD4F6088f2025427AB1e89257A44747081Ed59", value: parseUnits("0.00001", 18)}
        ],
        paymaster: paymasterClient,
        paymasterContext: paymasterContext ? JSON.parse(paymasterContext) : undefined,
    });

    console.log("userOpHash:: ", userOpHash);
    return userOpHash;
}
