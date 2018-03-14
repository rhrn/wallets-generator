import bitcoin from 'bitcoinjs-lib'

export function generateWallet ({ test } = {}) {
  const network = test ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
  const pair = bitcoin.ECPair.makeRandom({ network })

  return {
    privateKey: pair.toWIF(),
    address: pair.getAddress()
  }
}
