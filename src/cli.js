#!/usr/bin/env node

import Vorpal from 'vorpal'
import { generate, list, exportAddress, coinsList } from './actions'

const vorpal = Vorpal()

vorpal.command('coins', 'Supported coins list')
  .action(coinsList)

vorpal.command('generate <coin>', 'Generate wallets')
  .alias('gen')
  .alias('g')
  .option('-c, --count [count]', 'Wallets counts')
  .option('-r, --random [random]', 'Random string')
  .option('-g, --group [group]', 'Subdirectory group')
  .option('--one-file', 'Saves all generated wallets as one file')
  .action(generate)

vorpal.command('list <coin>', 'List generated wallets')
  .alias('ls')
  .alias('l')
  .option('-g, --group [group]', 'Subdirectory group')
  .action(list)

vorpal.command('export <coin>', 'Export public address')
  .option('-o, --output <file>', 'Output csv file')
  .option('--csv', 'Output to csv')
  .option('--json', 'Output to json')
  .option('--include-private-key', 'Includes private key in exported file (USE WITH CAUTION)')
  .action(exportAddress)

vorpal.find('exit').remove()

vorpal.parse(process.argv)

if (process.argv.length <= 2) {
  vorpal.exec('help')
}
