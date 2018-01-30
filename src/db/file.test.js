import os from 'os'
import path from 'path'
import fs from 'fs-extra'
import * as db from './file'
import * as coins from '../coins'

const ROOT_DIR = path.join(os.tmpdir(), 'wallets-generator-test', '__tmp')

beforeAll(async () => {
  await fs.emptyDir(ROOT_DIR)
})

it('generate file name by address', () => {
  const filename = db.generateFilenameForSingleWallet('publicAddress')

  expect(filename).toContain('UTC--')
  expect(filename).toContain('--publicAddress')
})

it('save wallet', async () => {
  const wallet = coins.eth.generateWallet()

  const file = await db.saveWallet(ROOT_DIR, wallet)
  const readFile = await fs.readJson(file.fullPath)

  expect(readFile).toEqual(wallet)
})

afterAll(async () => {
  await fs.remove(ROOT_DIR)
})
