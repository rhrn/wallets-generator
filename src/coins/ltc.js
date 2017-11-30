import bitcoin from 'bitcoinjs-lib'

export function generateWallet () {
  const { litecoin } = bitcoin.networks

  const pair = bitcoin.ECPair.makeRandom({ network: litecoin })

  return {
    privateKey: pair.toWIF(),
    address: pair.getAddress()
  }
}
