import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalize, translate, translateAlt, lookupTemplate } from '../src/flasher/translate.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = fs.readFileSync(path.join(root, 'public/flash/app_combined.js'), 'utf8')

const decode = (text) =>
  text
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')

const STRING = "'((?:[^'\\\\\\n]|\\\\.)*)'"
const patterns = [
  new RegExp(`\\bD\\(\\s*${STRING}`, 'g'),
  new RegExp(`\\bV\\([\\w$]+,\\s*${STRING}`, 'g'),
  new RegExp(`\\bW\\([\\w$]+,\\s*\\d+,\\s*${STRING}`, 'g'),
  new RegExp(`\\bJg\\(\\s*[\\w$]+,\\s*${STRING}`, 'g'),
  new RegExp(`label:\\s*${STRING}`, 'g'),
  new RegExp(`\\.text\\(\\s*${STRING}`, 'g'),
  new RegExp(`'aria-label',\\s*${STRING}`, 'g'),
  new RegExp(`\\bS\\([\\w$]+,\\s*${STRING}`, 'g'),
  new RegExp(`return\\s+${STRING}`, 'g'),
]

const NOT_UI = [
  /^(Dogfood only:|Tip:)$/,
  /^(Bluetooth® mode|Privacy|Terms|Select language|Go to mode selection page)$/,
  /^(Play wirelessly with Bluetooth|Important things to know|Find the answers you need)$/,
  /^(Switching to Bluetooth mode downloads|System requirements: Chrome)/,
  /^(Disclaimer: |The Bluetooth® word mark|A Stadia Controller with a hand-drawn rocket)/,
  /^(After switching your controller|Not all Bluetooth devices|When using the controller wirelessly|Yes\. By default|You can verify whether)/,
  /^(Make sure your controller is charged for at least|Unfortunately, customer support)/,
  /^(HIGHLY CONFIDENTIAL|This page is currently configured|DVT devices|PVT devices|To enable automatic firmware)/,
  /^(Català|Čeština|Dansk|Nederlands|English \(|Suomi|Français|Deutsch|Magyar|Italiano|Norsk|Polski|Português|Română|Slovenčina|Español|Svenska|Türkçe)/,
  /^[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
]
const isHumanText = (text) => /[A-Za-z]{3}/.test(text) && (/\s/.test(text) || /^[A-Z]/.test(text)) && !/^[a-z_]+$/.test(text)

const ignored = (text) => NOT_UI.some((rule) => rule.test(normalize(text)))

const found = new Map()
for (const pattern of patterns) {
  for (const match of source.matchAll(pattern)) {
    const text = decode(match[1])
    if (!isHumanText(text) || ignored(text)) continue
    found.set(text, true)
  }
}

const missing = []
const checked = []

function pieces(raw) {
  const parts = raw.split(/\x01\d+\x01/)
  const tokens = raw.match(/\x01\d+\x01/g) || []
  return { parts, tokens }
}

for (const raw of found.keys()) {
  if (!raw.includes('\x01')) {
    const key = normalize(raw)
    checked.push(key)
    if (translate(key, 'it') === key) missing.push(key)
    continue
  }
  const { parts, tokens } = pieces(raw)
  if (tokens.length > 4) {
    for (const part of parts.map(normalize).filter(Boolean)) {
      checked.push(part)
      if (translate(part, 'it') === part) missing.push(part)
    }
    continue
  }
  let outer = parts[0]
  let slot = 0
  const inner = []
  for (let index = 0; index < tokens.length; index += 1) {
    const closing = /^\x011\x01$/.test(tokens[index])
    const wrapsNext = !closing && /^\x011\x01$/.test(tokens[index + 1] || '')
    if (closing) {
      outer += parts[index + 1]
      continue
    }
    outer += `{${slot++}}`
    if (wrapsNext) {
      inner.push(parts[index + 1])
      continue
    }
    outer += parts[index + 1]
  }
  const key = normalize(outer)
  checked.push(key)
  const probe = /\{0\}%/.test(key) ? key.replace('{0}', '5') : key
  if (!lookupTemplate(key, 'it') && translate(probe, 'it') === probe) missing.push(key)
  for (const text of inner.map(normalize).filter((value) => value && !ignored(value))) {
    checked.push(text)
    if (translate(text, 'it') === text) missing.push(text)
  }
}

const alts = new Set()
for (const match of source.matchAll(/'(A (?:Stadia Controller|two-part image|plugged-in)(?:[^'\\\n]|\\.)*)'/g)) alts.add(decode(match[1]))
for (const alt of alts) {
  if (ignored(alt)) continue
  const key = normalize(alt)
  checked.push(key)
  if (translateAlt(key, 'it') === key) missing.push(key)
}

const unique = [...new Set(missing)]
console.log(`Engine texts checked: ${new Set(checked).size}`)
if (unique.length) {
  console.log(`Missing Italian translations: ${unique.length}`)
  for (const text of unique) console.log(`- ${text.slice(0, 160)}`)
  process.exit(1)
}
console.log('All engine texts have an Italian translation')
