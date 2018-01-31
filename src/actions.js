import path from 'path'
import * as api from './'

const prepare = (args) => {
  const cwd = process.cwd()
  const coin = args.coin.toLowerCase()
  const count = args.options.count || 1
  const wallets = args.options.wallets || 'wallets'
  const group = args.options.group || 'main'
  const includePrivateKey = args.options['include-private-key']
  const saveAsOneFile = args.options['one-file']

  const workdir = path.join(cwd, wallets)
  const subPath = path.join(coin, group)
  const root = path.join(workdir, subPath)

  let json = args.options.json
  let csv = args.options.csv

  if (json === undefined || csv === undefined) {
    json = true
  }

  args.options.output = args.options.output || `${coin}-${Date.now()}.${json ? 'json' : 'csv'}`

  const output = path.join(cwd, args.options.output)

  return { coin, count, group, root, output, json, csv, includePrivateKey, saveAsOneFile }
}

export async function coinsList (args, done) {
  try {
    const result = await api.coinsList()
    result.coins.forEach(coin => console.log('-', coin))
  } catch (e) {
    done(e)
  }
}

export async function generate (args, done) {
  try {
    const options = prepare(args)
    const result = await api.generate(options)
    console.log(result)
  } catch (e) {
    done(e)
  }
}

export async function list (args, done) {
  try {
    const options = prepare(args)
    const result = api.list(options)
    result.data.forEach(file => console.log(file))
  } catch (e) {
    done(e)
  }
}

export async function exportAddress (args, done) {
  try {
    const options = prepare(args)
    await api.exportAddress(options)
    console.log('saved to:', options.output)
  } catch (e) {
    done(e)
  }
}
