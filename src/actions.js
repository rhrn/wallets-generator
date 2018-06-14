import path from 'path'
import * as api from './'

const prepare = (args) => {
  const cwd = process.cwd()
  const coin = args.coin.toLowerCase()
  const count = args.options.count || 1
  const wallets = args.options.wallets || 'wallets'
  const test = args.options.test || false
  const collect = args.options.collect || false
  const address = args.address || null
  let group = args.options.group || 'main'
  if (test) group += '-test'
  const workdir = path.join(cwd, wallets)
  const subPath = path.join(coin, group)
  const root = path.join(workdir, subPath)

  let json = args.options.json
  let csv = args.options.csv

  if (json === undefined || csv === undefined) {
    json = true
  }

  args.options.output = args.options.output || `${coin}${test ? '-test' : ''}-${Date.now()}.${json ? 'json' : 'csv'}`

  const output = path.join(cwd, args.options.output)

  return { coin, count, group, root, output, json, csv, test, address, collect }
}

export async function balance (args, done) {
  try {
    const options = prepare(args)
    const result = await api.balance(options)
    if (options.collect) {
      console.log(result)
    }
  } catch (e) {
    done(e)
  }
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
