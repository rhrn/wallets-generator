import bch from 'bitcoincashjs'

export function generateWallet ({ test } = {}) {
  const network = test ? 'testnet' : 'livenet'
  const privateKey = new bch.PrivateKey()

  return {
    privateKey: privateKey.toString(),
    address: privateKey.toAddress(network).toString()
  }
}
