# Free Bundler Usage Examples

This guide provides example commands for running user operations (userops) using the Free Bundler client.

## Prerequisites

- Node.js >= 18.0.0 or Bun >= 1.0.0
- A private key for the smart account

## Command Line Arguments

The example script accepts the following command line arguments:

- `--chain-id` (optional): Chain ID for the userop, defaults to 11155111
- `--account-type` (optional): Type of smart account implementation, defaults to `simple7702`
- `--private-key` (required): Private key that controls the smart account
- `--paymaster-url` (optional): Paymaster URL to sponsor user ops
- `--paymaster-context` (optional): JSON string for paymaster context

## Example Commands

### 1. Basic UserOp on Ethereum Mainnet

```bash
bun run ./examples/index.ts \
  --chain-id 1 \
  --account-type simple7702 \
  --private-key "0x..."
```

### 2. UserOp on Optimism with Custom RPC

```bash
bun run ./examples/index.ts \
  --chain-id 10 \
  --account-type simple7702 \
  --private-key "0x..." \
```

### 3. UserOp on Optimism with Paymaster

```bash
bun run ./examples/index.ts \
  --chain-id 10 \
  --account-type simple7702 \
  --private-key "0x..." \
  --paymaster-url "https://api.stackup.sh/v1/paymaster/YOUR_STACKUP_KEY" \
  --paymaster-context '{"sponsor": true}'
```

## Supported Networks

The following networks are supported by the free bundler:

- **Ethereum Mainnet**: Chain ID `1`
- **Optimism**: Chain ID `10`
- **Arbitrum One**: Chain ID `42161`

## Account Types

Currently supported smart account implementations:

- **simple7702**: EIP-7702 compatible smart account

## What the Example Does

The example script demonstrates:

1. **Smart Account Creation**: Creates a Simple7702 smart account from a private key
2. **Authorization Check**: Automatically handles EIP-7702 authorization if needed
3. **UserOp Execution**: Sends a user operation that transfers 0.0000001 ETH to a test address
4. **Paymaster Integration**: Optional paymaster support for sponsored transactions

### Getting Help

```bash
bun run ./examples/index.ts --help
```

This will display all available options and their descriptions.

## Development

To run in development mode with auto-reload:

```bash
bun run dev
```

To build the project:

```bash
bun run build
```
