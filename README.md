
# @etherspot/free-bundler

A TypeScript library for creating ERC-4337 bundler clients with preconfigured free endpoints.

## Features

- 🚀 **Zero Configuration** - Works out of the box with free Etherspot bundlers
- 🌐 **Multi-Chain Support** - Ethereum, Polygon, Arbitrum, Optimism, Base
- 🔧 **Fully Configurable** - Override any default settings
- 📦 **TypeScript First** - Full type safety with viem integration
- 🎯 **Tree Shakeable** - Import only what you need
- ⚡ **Bun Compatible** - Optimized for Bun runtime and toolchain

## Installation

```bash
bun add @etherspot/free-bundler viem
# or
npm install @etherspot/free-bundler viem
# or
yarn add @etherspot/free-bundler viem
# or
pnpm add @etherspot/free-bundler viem
```

## Quick Start

```typescript
import { createFreeBundler } from '@etherspot/free-bundler'
import { mainnet } from 'viem/chains'

// Create bundler client for Ethereum Sepolia
const bundlerClient = createFreeBundler({ chain: mainnet })

// Send a user operation
const hash = await bundlerClient.sendUserOperation({
  account,
  userOperation: {
    sender: '0x...',
    nonce: 0n,
    callData: '0x...',
    // ... other fields
  },
  entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'
})
```

## Development with Bun

This package is optimized for Bun and includes specific Bun configurations:

```bash
# Install dependencies
bun install

# Run development build
bun run dev

# Run tests with Bun's built-in test runner
bun test

# Run tests with coverage
bun test --coverage

# Build the package
bun run build

# Type checking
bun run typecheck

# Linting
bun run lint
bun run lint:fix
```

## Supported Chains

| Chain | Chain ID | Network |
|-------|----------|---------|
| Ethereum | 1 | Mainnet |
| Ethereum Sepolia | 11155111 | Testnet |
| Polygon | 137 | Mainnet |
| Polygon Mumbai | 80001 | Testnet |
| Arbitrum One | 42161 | Mainnet |
| Arbitrum Sepolia | 421614 | Testnet |
| Optimism | 10 | Mainnet |
| Optimism Sepolia | 11155420 | Testnet |
| Base | 8453 | Mainnet |
| Base Sepolia | 84532 | Testnet |

## API Reference

### `createFreeBundler(options)`

Creates a bundler client with preconfigured settings.

#### Parameters

- `options` (object, optional):
  - `bundlerUrl?` (string): Custom bundler URL
  - `chain` (Chain): Viem chain configuration
  - `account?` (Account): Viem account configuration
  - `transport?` (object): HTTP transport options
    - `timeout?` (number): Request timeout in ms (default: 30000)
    - `retryCount?` (number): Number of retries (default: 3)
    - `retryDelay?` (number): Delay between retries in ms (default: 150)
  - `client?` (object): Additional client options
    - `name?` (string): Client name (default: "Free Bundler Client")
    - `pollingInterval?` (number): Polling interval in ms (default: 4000)

#### Returns

A viem bundler client with all bundler actions available.

### Utility Functions

```typescript
import {
  getSupportedChainIds,
  isChainSupported,
  getBundlerConfig,
  getChainName
} from '@etherspot/free-bundler'

// Check supported chains
const chainIds = getSupportedChainIds() // [1, 11155111, 137, ...]
const isSupported = isChainSupported(1) // true

// Get chain information
const config = getBundlerConfig(1)
// { chainId: 1, name: 'Ethereum Mainnet', url: '...', isTestnet: false }

const name = getChainName(1) // 'Ethereum Mainnet'
```

## Advanced Usage

### Custom Transport Configuration

```typescript
const bundlerClient = createFreeBundler({
  transport: {
    timeout: 15000,
    retryCount: 5,
    retryDelay: 200
  },
  chain: mainnet
})
```

### Custom Bundler URL

```typescript
const bundlerClient = createFreeBundler({
  bundlerUrl: 'https://your-custom-bundler.com',
  chain: mainnet
})
```

### With Chain and Account Configuration

```typescript
import { createFreeBundler } from '@etherspot/free-bundler'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x...')

const bundlerClient = createFreeBundler({
  chain: mainnet,
  account,
  client: {
    name: 'My Custom Bundler',
    pollingInterval: 2000
  }
})
```

## Error Handling

```typescript
import { createFreeBundler, isChainSupported } from '@etherspot/free-bundler'

try {
  // Check if chain is supported first
  if (!isChainSupported(999)) {
    throw new Error('Chain not supported')
  }
  
  const bundlerClient = createFreeBundler(999)
} catch (error) {
  console.error('Failed to create bundler:', error.message)
}
```

## Bun Specific Features

This package takes advantage of Bun's capabilities:

- **Fast Installation**: Uses Bun's lightning-fast package manager
- **Built-in Testing**: Leverages Bun's native test runner
- **TypeScript Support**: No additional transpilation needed
- **ESM First**: Optimized for modern JavaScript modules

## Runtime Compatibility

- **Bun**: >=1.0.0 (recommended)
- **Node.js**: >=18.0.0
- **Browser**: Modern browsers with ESM support

## License
MIT

