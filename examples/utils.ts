import * as chains from "viem/chains"

export const getChainById = (id: number): chains.Chain => {
    for (const chain of Object.values(chains)) {
        if ('id' in chain && chain.id === id) {
            return chain;
        }
    }
    throw new Error(`Chain with id ${id} not found`);
}
