import type { Chain, Client, RpcSchema, Transport } from 'viem'
import type { BundlerActions, SmartAccount } from 'viem/account-abstraction'

export type FreeBundlerClient<
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  account extends SmartAccount | undefined = SmartAccount | undefined,
> = Client<transport, chain, account, RpcSchema, BundlerActions>

export interface TransportOptions {
  timeout?: number
  retryCount?: number
  retryDelay?: number
}

export interface ClientOptions {
  name?: string
  pollingInterval?: number
}

export interface CreateFreeBundlerOptions<
  chain extends Chain,
  account extends SmartAccount | undefined = undefined,
> {
  /** Custom bundler URL to override default */
  bundlerUrl?: string
  /** Chain configuration */
  chain: chain
  /** Account configuration */
  account?: account
  /** Transport configuration options */
  transport?: TransportOptions
  /** Additional client options */
  client?: ClientOptions
}

export interface BundlerConfig {
  chainId: number
  name: string
  url: string
  isTestnet: boolean
}

// Re-export for module compatibility
export {}