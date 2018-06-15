# WARNING: it is alpha version. use at your own risk
### Geneate cold wallets and export public address to json and csv

[![Build Status](https://travis-ci.org/rhrn/wallets-generator.svg?branch=master)](https://travis-ci.org/rhrn/wallets-generator)
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

### Install
```
npm install -g wallets-generator
```

### API

#### Show supported coins
* `wallets-generator coins`
```
- { name: 'Bitcoin', symbol: 'btc' }
- { name: 'Ethereum', symbol: 'eth' }
- { name: 'Litecoin', symbol: 'ltc' }
- { name: 'Bitcoin Cash', symbol: 'bch' }
- { name: 'Bitcoin Gold', symbol: 'btg' }
- { name: 'Ethereum Classic', symbol: 'etc' }
```

#### Generate
* `wallets-generator generate btc --count 3 `
```
{ generated: 3 }
```

#### Show list
* `wallets-generator list btc`
```
UTC--2017-11-30T10-01-33.413Z--1G3tYxPW9aBVkVn9WqGn2sJGsHehBCZ3zB
UTC--2017-11-30T10-01-33.454Z--1H5pnU1kREM6cc3wMuKQWHJC7z8bDZVUmR
UTC--2017-11-30T10-01-33.487Z--14zqZnKMisTbz8bzeUUUvwQ5DueJKyHiYw
```

#### Get balance
* `wallets-generator balance btc`
```
n32noJgdnkCBch7QRTQybQhyScjJi48ktZ 1.2
mrCeipU9MKEYBauatYdd1guYVFvGZpnV46 0
mpvtspaeiU87pEigfPUfY7HjWvo9Fh6oUr 0
```

#### Export to json
* `wallets-generator export btc --json --output btc.json`
```
saved to: /path/btc.json
```

* `cat btc.json`
```
{"address":[{"timezone":"UTC","date":"2017-11-30T10-01-33.413Z","address":"1G3tYxPW9aBVkVn9WqGn2sJGsHehBCZ3zB"},{"timezone":"UTC","date":"2017-11-30T10-01-33.454Z","address":"1H5pnU1kREM6cc3wMuKQWHJC7z8bDZVUmR"},{"timezone":"UTC","date":"2017-11-30T10-01-33.487Z","address":"14zqZnKMisTbz8bzeUUUvwQ5DueJKyHiYw"}]}
```

#### Export to csv
* `wallets-generator export btc --csv --output btc.csv`
```
saved to: /path/btc.csv
```

* `cat btc.csv`
```
1G3tYxPW9aBVkVn9WqGn2sJGsHehBCZ3zB,UTC,2017-11-30T10-01-33.413Z
1H5pnU1kREM6cc3wMuKQWHJC7z8bDZVUmR,UTC,2017-11-30T10-01-33.454Z
14zqZnKMisTbz8bzeUUUvwQ5DueJKyHiYw,UTC,2017-11-30T10-01-33.487Z
```

#### Show help
* `wallets-generator help`
```
  Commands:

    help [command...]                   Provides help for a given command.
    coins                               Supported coins list
    balance [options] <coin> [address]  Get balance of address
    generate [options] <coin>           Generate wallets
    list [options] <coin>               List generated wallets
    export [options] <coin>             Export public address
```
