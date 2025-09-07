import { FREE_BUNDLER_URLS, BUNDLER_CONFIGS } from './config.js'
import type { BundlerConfig } from './types'

/**
 * Get the preconfigured bundler URL for a given chain ID
 * 
 * @param chainId - The chain ID
 * @returns The bundler URL or undefined if not supported
 */
export function getFreeBundlerUrl(chainId: number): string | undefined {
  return FREE_BUNDLER_URLS[chainId]
}

/**
 * Get bundler configuration for a given chain ID
 * 
 * @param chainId - The chain ID
 * @returns The bundler configuration or undefined if not supported
 */
export function getBundlerConfig(chainId: number): BundlerConfig | undefined {
  return BUNDLER_CONFIGS[chainId]
}

/**
 * Get all supported chain IDs for free bundlers
 * 
 * @returns Array of supported chain IDs
 */
export function getSupportedChainIds(): number[] {
  return Object.keys(FREE_BUNDLER_URLS).map(Number)
}

/**
 * Get all bundler configurations
 * 
 * @returns Array of all bundler configurations
 */
export function getAllBundlerConfigs(): BundlerConfig[] {
  return Object.values(BUNDLER_CONFIGS)
}

/**
 * Get bundler configurations filtered by testnet status
 * 
 * @param isTestnet - Whether to get testnet or mainnet configurations
 * @returns Array of filtered bundler configurations
 */
export function getBundlerConfigsByNetwork(isTestnet: boolean): BundlerConfig[] {
  return getAllBundlerConfigs().filter(config => config.isTestnet === isTestnet)
}

/**
 * Check if a chain ID has a preconfigured free bundler
 * 
 * @param chainId - The chain ID to check
 * @returns True if supported, false otherwise
 */
export function isChainSupported(chainId: number): boolean {
  return chainId in FREE_BUNDLER_URLS
}

/**
 * Get chain name by chain ID
 * 
 * @param chainId - The chain ID
 * @returns The chain name or 'Unknown Chain' if not found
 */
export function getChainName(chainId: number): string {
  const config = getBundlerConfig(chainId)
  return config?.name ?? 'Unknown Chain'
}

/**
 * Validate chain ID and throw descriptive error if unsupported
 * 
 * @param chainId - The chain ID to validate
 * @throws Error if chain ID is not supported
 */
export function validateChainId(chainId: number): void {
  if (!isChainSupported(chainId)) {
    const supportedChains = getSupportedChainIds().join(', ')
    throw new Error(
      `Unsupported chain ID: ${chainId}. ` +
      `Supported chains: ${supportedChains}. ` +
      `Use a custom bundler URL for unsupported chains.`
    )
  }
}