import path from 'path'
import * as fs from 'fs-extra'

const SEPARATOR = '--'

export function parseList (list, coin) {
  return list.map(file => {
    const [ timezone, date, address ] = file.split(SEPARATOR)

    return { timezone, date, address, coin }
  })
}

export function generateFilename (address) {
  const ts = new Date()

  return [
    'UTC',
    SEPARATOR,
    ts.toJSON().replace(/:/g, '-'),
    SEPARATOR,
    address
  ].join('')
}

export async function saveWallet (root, wallet) {
  const filename = generateFilename(wallet.address)
  const fullPath = path.join(root, filename)

  await fs.writeJson(fullPath, wallet)

  return {
    filename,
    fullPath
  }
}
