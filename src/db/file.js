import path from 'path'
import * as fs from 'fs-extra'

const SEPARATOR = '--'

export async function parseList (list, coin, root, includePrivateKey = false) {
  let parsedList = []

  for (let filename of list) {
    if (isMultipleWalletsFile(filename)) {
      parsedList = parsedList.concat(await deserializeMultipleWalletsFile(filename, coin, root, includePrivateKey))

      continue
    }

    parsedList.push(await deserializeSingleWalletFile(filename, coin, root, includePrivateKey))
  }

  return parsedList
}

export async function deserializeSingleWalletFile (filename, coin, root, includePrivateKey = false) {
  const [ timezone, date, address ] = filename.split(SEPARATOR)

  const deserializedWallet = { timezone, date, address, coin }

  if (includePrivateKey) {
    const { privateKey } = await fs.readJSON(getFullWalletPath(root, filename))

    Object.assign(deserializedWallet, {
      privateKey
    })
  }

  return deserializedWallet
}

export async function deserializeMultipleWalletsFile (filename, coin, root, includePrivateKey = false) {
  const [ , timezone, date ] = filename.split(SEPARATOR)

  const { wallets } = await fs.readJSON(getFullWalletPath(root, filename))

  return wallets.map(wallet => {
    if (!includePrivateKey) {
      delete wallet['privateKey']
    }

    Object.assign(wallet, {
      timezone,
      date,
      coin
    })

    return wallet
  })
}

export function generateFilenameForSingleWallet (address) {
  const ts = new Date()

  return [
    'UTC',
    SEPARATOR,
    ts.toJSON().replace(/:/g, '-'),
    SEPARATOR,
    address,
    SEPARATOR
  ].join('')
}

export function isMultipleWalletsFile (filename) {
  return filename.indexOf('MULTIPLE') !== -1
}

export function generateFilenameForMultipleWallets (wallets = []) {
  const ts = new Date()

  return [
    'MULTIPLE',
    SEPARATOR,
    'UTC',
    SEPARATOR,
    ts.toJSON().replace(/:/g, '-'),
    SEPARATOR,
    'COUNT',
    SEPARATOR,
    wallets.length
  ].join('')
}

export async function saveWallet (root, wallet) {
  const filename = generateFilenameForSingleWallet(wallet.address)
  const fullPath = path.join(root, filename)

  await fs.writeJson(fullPath, wallet)

  return {
    filename,
    fullPath
  }
}

export async function saveMultipleWallets (root, wallets) {
  const filename = generateFilenameForMultipleWallets(wallets)
  const fullPath = path.join(root, filename)

  await fs.writeJson(fullPath, {
    wallets
  })

  return {
    filename,
    fullPath
  }
}

function getFullWalletPath (root, filename) {
  return path.join(root, filename)
}
