import bitcoin from 'bgoldjs-lib'

export function generateWallet ({ test } = {}) {
  const network = test ? bitcoin.networks.testnet : bitcoin.networks.bitcoingold
  const pair = bitcoin.ECPair.makeRandom({ network })

  return {
    privateKey: pair.toWIF(),
    address: pair.getAddress()
  }
}
