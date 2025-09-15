import { toSimple7702SmartAccount, ToSimple7702SmartAccountReturnType } from "viem/account-abstraction";
import { createFreeBundler } from "../src/client.js"
import { privateKeyToAccount } from "viem/accounts";
import { optimism } from "viem/chains";
import {
    http,
    parseUnits,
    createClient,
    publicActions,
    walletActions,
    Hex
} from "viem";


const main = async () => {
    const owner = privateKeyToAccount(
        process.env.PRIVATE_KEY as Hex
    );

    const client = createClient({
        account: owner,
        transport: http(),
        chain: optimism
    }).extend(publicActions).extend(walletActions);

    const smartAccount: ToSimple7702SmartAccountReturnType = await toSimple7702SmartAccount({
        client,
        owner,
    });

    const bundlerClient = createFreeBundler(10, {account: smartAccount, chain: optimism});

    const authorization = await client.signAuthorization(smartAccount.authorization)
    
    const res = await bundlerClient.sendUserOperation({
        authorization,
        calls: [
            {to: "0x09FD4F6088f2025427AB1e89257A44747081Ed59", value: parseUnits('0.0000001', 18)}
        ]
    });

    console.log("res:: ", res);
}

main();