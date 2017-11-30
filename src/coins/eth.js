import wallet from 'ethereumjs-wallet'

export function generateWallet () {
  const pair = wallet.generate()

  return {
    privateKey: pair.getPrivateKeyString(),
    address: pair.getAddressString()
  }
}
