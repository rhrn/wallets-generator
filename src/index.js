import fs from 'fs-extra'
import * as db from './db/file'
import * as coins from './coins'

export async function coinsList () {
  return {
    coins: Object.keys(coins)
  }
}

export async function generate ({ coin, count, root }) {
  count = +count

  if (!coins[coin]) {
    throw new Error(`Coin ${coin} not supported`)
  }

  await fs.ensureDir(root)

  let i = 0
  for (; i < count; i++) {
    const wallet = coins[coin].generateWallet()
    await db.saveWallet(root, wallet)
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

export async function exportAddress ({ root, output, json }) {
  const { data } = list({ root })

  if (json) {
    await listToJSON({ list: db.parseList(data), output })
  } else {
    await listToCSV({ list: db.parseList(data), output })
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
