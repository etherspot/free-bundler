import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const argv = await yargs(hideBin(process.argv))
  .option('chain-id', {
    description: 'chain id for the userop, supported networks - (ethereum(1), optimism(10), arbitrum(42161))',
    type: 'number',
    demandOption: true
  })
  .option('account-type', {
    description: 'type of smart account implementation, available:\n1. simple7702',
    type: 'string',
    demandOption: true
  })
  .option('private-key', {
    description: 'private key which controls the smart account',
    type: 'string',
    demandOption: true
  })
  .option('rpc-url', {
    description: 'rpc url for the chain on which userop needs to execute',
    type: 'string'
  })
  .option('paymaster-url', {
    description: 'paymaster url to sponsor user ops',
    type: 'string'
  })
  .option('paymaster-context', {
    description: 'stringified json to be used as context for paymaster',
    type: 'string'
  })
  .help()
  .alias('help', 'h')
  .argv;
