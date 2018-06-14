import axios from 'axios'

const BITCOIN_DIGITS = 8
const BITCOIN_SAT_MULT = Math.pow(10, BITCOIN_DIGITS)

export const baseUrls = {
  bitcoin: {
    mainnet: 'https://blockexplorer.com/api',
    testnet: 'https://testnet.blockexplorer.com/api'
  },
  bitcoin_cache: {
    mainnet: 'https://bitcoincash.blockexplorer.com/api',
    testnet: 'https://test-bch-insight.bitpay.com/api'
  },
  bitcoin_gold: {
    mainnet: 'https://explorer.bitcoingold.org/insight-api',
    testnet: 'https://test-explorer.bitcoingold.org/insight-api'
  },
  litecoin: {
    mainnet: 'https://insight.litecore.io/api',
    testnet: 'https://testnet.litecore.io/api'
  }
}

export function Api (baseUrl) {
  const api = {
    baseUrl
  }

  api.getBalance = async function (address) {
    const res = await axios(`${this.baseUrl}/addr/${address}/balance`)
    if (res.status === 200) {
      return res.data / BITCOIN_SAT_MULT
    }
    throw res
  }

  return api
}
