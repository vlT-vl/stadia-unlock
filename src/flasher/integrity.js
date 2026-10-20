export const ENGINE_BASE = `${import.meta.env.BASE_URL}flash/`
export const ENGINE_URL = `${ENGINE_BASE}index.html`

const MANIFEST = {
  'index.html': '1bd3a77788c90a4ae23f89e0bf0de2698240b1c0b44358dca03bf168918eebc6',
  'app_combined.js': 'dde766e849fe470fa47b40cb4f5fec03dddb3ef922195cfe307f2319b3494c8a',
  'app.css': '48d2a6a8da19b7f77244c1fed0d68117ba7d82a5b03b0999fb63ce224bcbd410',
  'data/bruce_dvt_a_dev_signed.bin': '2ba45219a35403c43a1a65130b278823b04f05635efe1c4a5a6989a0c78b7245',
  'data/bruce_dvt_a_stage_signed.bin': 'e0bbada02813b3bae8657261502bf36c6f93d1f46da3005b2bfae27a794bcaf0',
  'data/bruce_pvt_a_prod_signed.bin': '466ddd2dbcd8d1a66e2826f25849a6e5e45d9bb7e696e3fe0d500af56a5507a3',
  'data/flashloader_fcb_get_vendor_id.bin': '9fb11e0bf9816b502d9abf42a4895aeaad6ff516ac09beeea2bf0b3c756349d0',
  'data/flashloader_fcb_w25q128jw.bin': 'c33b647b308ff189ab3c4daab1af0651247dbe0e7834185717f988aa3b9719fd',
  'data/restricted_ivt_flashloader.bin': 'c39ea8962cc3094a9167ba80634f1ea0652b747b4572d1de2802d9f2f4e144c5',
}

async function sha256(buffer) {
  const digest = await crypto.subtle.digest('SHA-256', buffer)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function checkFile(path, expected) {
  try {
    const response = await fetch(`${ENGINE_BASE}${path}`, { cache: 'no-store' })
    if (!response.ok) return { path, ok: false, reason: `HTTP ${response.status}` }
    const actual = await sha256(await response.arrayBuffer())
    return actual === expected ? { path, ok: true } : { path, ok: false, reason: 'hash' }
  } catch (error) {
    return { path, ok: false, reason: String(error?.message || error) }
  }
}

export async function verifyEngineFiles() {
  if (!globalThis.crypto?.subtle) return { ok: false, failed: [{ path: 'crypto', ok: false, reason: 'unavailable' }] }
  const results = await Promise.all(Object.entries(MANIFEST).map(([path, expected]) => checkFile(path, expected)))
  const failed = results.filter((result) => !result.ok)
  return { ok: failed.length === 0, failed }
}
