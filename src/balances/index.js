import * as Insight from '../packages/insight'
import etherscan from 'etherscan-api'
import { promiseAll } from 'concurrency-promise'

export async function getInsightBalances ({ baseUrl, addresses, collect }) {
  const api = Insight.Api(baseUrl)

  const promises = addresses.map(address => {
    return async () => {
      const balance = await api.getBalance(address)
      if (!collect) {
        return console.log(address, balance)
      }
      return { address, balance }
    }
  })

  return promiseAll(promises, 1)
}

export async function getBtcBalances ({ test, addresses, collect }) {
  const baseUrl = test ? Insight.baseUrls.bitcoin.testnet : Insight.baseUrls.bitcoin.mainnet
  return getInsightBalances({ baseUrl, addresses, collect })
}

export async function getLtcBalances ({ test, addresses, collect }) {
  const baseUrl = test ? Insight.baseUrls.litecoin.testnet : Insight.baseUrls.litecoin.mainnet
  return getInsightBalances({ baseUrl, addresses, collect })
}

export async function getBchBalances ({ test, addresses, collect }) {
  const baseUrl = test ? Insight.baseUrls.bitcoin_cache.testnet : Insight.baseUrls.bitcoin_cache.mainnet
  return getInsightBalances({ baseUrl, addresses, collect })
}

export async function getBtgBalances ({ test, addresses, collect }) {
  const baseUrl = test ? Insight.baseUrls.bitcoin_gold.testnet : Insight.baseUrls.bitcoin_gold.mainnet
  return getInsightBalances({ baseUrl, addresses, collect })
}

export async function getEthBalances ({ test, addresses, collect }) {
  const api = etherscan.init('', test ? 'kovan' : 'mainnet')

  const promises = addresses.map(address => {
    return async () => {
      const { result: balance } = await api.account.balance(address)
      if (!collect) {
        return console.log(address, balance)
      }
      return { address, balance }
    }
  })

  return promiseAll(promises, 1)
}

export async function getEtcBalances () {
  throw new Error('Open ETC node or api for balance not found. Please submit issue if find it. https://github.com/rhrn/wallets-generator/issues')
}

export async function getBalances ({ coin, test, addresses, collect }) {
  switch (coin) {
    case 'btc':
      return getBtcBalances({ test, addresses, collect })
    case 'ltc':
      return getLtcBalances({ test, addresses, collect })
    case 'btg':
      return getBtgBalances({ test, addresses, collect })
    case 'bch':
      return getBchBalances({ test, addresses, collect })
    case 'eth':
      return getEthBalances({ test, addresses, collect })
    case 'etc':
      return getEtcBalances({ test, addresses, collect })
    default:
      throw new Error('Coin not supported')
  }
}
