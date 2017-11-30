import { generateWallet } from './eth'

it('generate wallet', () => {
  const { privateKey, address } = generateWallet()

  expect(typeof privateKey).toEqual('string')
  expect(privateKey.length).toBeGreaterThan(10)

  expect(typeof address).toEqual('string')
  expect(address.length).toBeGreaterThan(10)
})
