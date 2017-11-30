import bitcoin from 'bitcoinjs-lib'

export function generateWallet () {
  const pair = bitcoin.ECPair.makeRandom()

  return {
    privateKey: pair.toWIF(),
    address: pair.getAddress()
  }
}
