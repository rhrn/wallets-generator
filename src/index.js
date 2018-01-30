import 'babel-polyfill'
import fs from 'fs-extra'
import * as db from './db/file'
import * as coins from './coins'

export async function coinsList () {
  return {
    coins: [
      {
        name: 'Bitcoin',
        symbol: 'btc'
      },
      {
        name: 'Ethereum',
        symbol: 'eth'
      },
      {
        name: 'Litecoin',
        symbol: 'ltc'
      },
      {
        name: 'Bitcoin Cash',
        symbol: 'bch'
      },
      {
        name: 'Bitcoin Gold',
        symbol: 'btg'
      },
      {
        name: 'Ethereum Classic',
        symbol: 'etc'
      }
    ]
  }
}

export async function generate ({ coin, count, root, saveAsOneFile = false }) {
  count = +count

  if (!coins[coin]) {
    throw new Error(`Coin ${coin} not supported`)
  }

  await fs.ensureDir(root)

  const wallets = []

  let i = 0
  for (; i < count; i++) {
    const wallet = coins[coin].generateWallet()

    if (saveAsOneFile) {
      wallets.push(wallet)
    } else {
      await db.saveWallet(root, wallet)
    }
  }

  if (saveAsOneFile) {
    await db.saveMultipleWallets(root, wallets)
  }

  return {
    generated: i
  }
}

export function list ({ root }) {
  try {
    const data = fs.readdirSync(root)
    return { data }
  } catch (e) {
    if (e.code === 'ENOENT') {
      return { data: [] }
    }
    throw e
  }
}

export async function exportAddress ({ root, output, json, coin, includePrivateKey }) {
  const { data } = list({ root })

  if (json) {
    await listToJSON({ list: await db.parseList(data, coin, root, includePrivateKey), output })
  } else {
    await listToCSV({ list: await db.parseList(data, coin, root, includePrivateKey), output })
  }
}

export async function listToJSON ({ list, output }) {
  const address = { address: list }
  await fs.writeJson(output, address)
}

export async function listToCSV ({ list, output }) {
  const csv = list
    .map(file => [ file.address, file.timezone, file.date ].join(','))
    .join('\n')
  await fs.outputFile(output, csv)
}
