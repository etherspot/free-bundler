import type { BundlerConfig } from './types'

/**
 * Free bundler endpoints for different chains
 */
export const FREE_BUNDLER_URLS: Record<number, string> = {
  // Ethereum Mainnet
  1: 'https://bundler.etherspot.io/1/',
  
  // Ethereum Sepolia
  11155111: 'https://bundler.etherspot.io/11155111/',

  
  // Arbitrum One
  42161: 'https://bundler.etherspot.io/42161/',
  
  // Arbitrum Sepolia
  421614: 'https://bundler.etherspot.io/421614/',
  
  // Optimism Mainnet
  10: 'https://bundler.etherspot.io/10/',
  
  // Optimism Sepolia
  11155420: 'https://bundler.etherspot.io/11155420/',
  
} as const

/**
 * Chain configuration with metadata
 */
export const BUNDLER_CONFIGS: Record<number, BundlerConfig> = {
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    url: FREE_BUNDLER_URLS[1],
    isTestnet: false,
  },
  11155111: {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    url: FREE_BUNDLER_URLS[11155111],
    isTestnet: true,
  },
  42161: {
    chainId: 42161,
    name: 'Arbitrum One',
    url: FREE_BUNDLER_URLS[42161],
    isTestnet: false,
  },
  421614: {
    chainId: 421614,
    name: 'Arbitrum Sepolia',
    url: FREE_BUNDLER_URLS[421614],
    isTestnet: true,
  },
  10: {
    chainId: 10,
    name: 'Optimism Mainnet',
    url: FREE_BUNDLER_URLS[10],
    isTestnet: false,
  },
  11155420: {
    chainId: 11155420,
    name: 'Optimism Sepolia',
    url: FREE_BUNDLER_URLS[11155420],
    isTestnet: true,
  },
} as const

/**
 * Default transport options
 */
export const DEFAULT_TRANSPORT_OPTIONS = {
  timeout: 30000,
  retryCount: 3,
  retryDelay: 150,
} as const

/**
 * Default client options
 */
export const DEFAULT_CLIENT_OPTIONS = {
  name: 'Free Bundler Client',
  pollingInterval: 4000,
} as const