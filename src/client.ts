import type { Account, Chain, Transport } from 'viem'
import { createClient, http } from 'viem'
import { bundlerActions, SmartAccount } from 'viem/account-abstraction'

import type { FreeBundlerClient, CreateFreeBundlerOptions } from './types'
import { DEFAULT_TRANSPORT_OPTIONS, DEFAULT_CLIENT_OPTIONS } from './config.js'
import { getFreeBundlerUrl, validateChainId } from './utils.js'

/**
 * Creates a bundler client with preconfigured free bundler URLs
 * 
 * @param chainId - The chain ID to create the bundler client for
 * @param options - Optional configuration overrides
 * @returns A configured viem bundler client
 * 
 * @example
 * ```typescript
 * import { createFreeBundler } from '@etherspot/free-bundler'
 * 
 * Create bundler client for Ethereum Sepolia
 * const bundlerClient = createFreeBundler(11155111)
 * 
 * Create bundler client for Polygon with custom transport options
 * const bundlerClient = createFreeBundler(137, {
 *   transport: {
 *     timeout: 10000,
 *     retryCount: 3
 *   }
 * })
 * 
 * Use the bundler client
 * const userOperation = await bundlerClient.sendUserOperation({
 *   userOperation: {
 *     sender: '0x...',
 *     nonce: 0n,
 *     callData: '0x...',
 *     ... other fields
 *   },
 *   entryPoint: '0x...'
 * })
 * ```
 */
export function createFreeBundler<
  chain extends Chain | undefined = undefined,
  account extends SmartAccount | undefined = undefined,
>(
  chainId: number,
  options: CreateFreeBundlerOptions<chain, account> = {}
): FreeBundlerClient<Transport, chain, account> {
  // Get bundler URL from options or use preconfigured free endpoint
  const bundlerUrl = options.bundlerUrl || getFreeBundlerUrl(chainId)
  
  if (!bundlerUrl) {
    validateChainId(chainId)
  }

  // Create HTTP transport with configuration
  const transport = http(bundlerUrl, {
    timeout: options.transport?.timeout ?? DEFAULT_TRANSPORT_OPTIONS.timeout,
    retryCount: options.transport?.retryCount ?? DEFAULT_TRANSPORT_OPTIONS.retryCount,
    retryDelay: options.transport?.retryDelay ?? DEFAULT_TRANSPORT_OPTIONS.retryDelay,
  })

  // Create the base client
  const client = createClient({
    transport,
    chain: options.chain,
    account: options.account,
    name: options.client?.name ?? DEFAULT_CLIENT_OPTIONS.name,
    pollingInterval: options.client?.pollingInterval ?? DEFAULT_CLIENT_OPTIONS.pollingInterval,
  })

  // Extend with bundler actions
  return client.extend(bundlerActions) as FreeBundlerClient<Transport, chain, account>
}