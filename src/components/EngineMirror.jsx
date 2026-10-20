import { createElement } from 'react'
import {
  MdArrowBack,
  MdArrowRightAlt,
  MdBatteryAlert,
  MdBluetooth,
  MdBluetoothSearching,
  MdCheck,
  MdClose,
  MdErrorOutline,
  MdInfoOutline,
  MdLightbulbOutline,
  MdMoreHoriz,
  MdOpenInNew,
  MdRefresh,
  MdRestartAlt,
  MdSchedule,
  MdUpdate,
  MdUsb,
  MdUsbOff,
  MdWarningAmber,
} from 'react-icons/md'
import { actionOf, setEngineCheckbox, triggerEngine } from '../flasher/engine.js'
import { lookupTemplate, normalize, reportMissing, translate, translateAlt, translateLabel } from '../flasher/translate.js'

const SYMBOLS = {
  arrow_right_alt: MdArrowRightAlt,
  arrow_back: MdArrowBack,
  battery_very_low: MdBatteryAlert,
  bluetooth: MdBluetooth,
  bluetooth_searching: MdBluetoothSearching,
  check: MdCheck,
  close: MdClose,
  error: MdErrorOutline,
  info: MdInfoOutline,
  lightbulb: MdLightbulbOutline,
  more_horiz: MdMoreHoriz,
  open_in_new: MdOpenInNew,
  refresh: MdRefresh,
  restart_alt: MdRestartAlt,
  schedule: MdSchedule,
  update: MdUpdate,
  usb: MdUsb,
  usb_off: MdUsbOff,
  warning: MdWarningAmber,
}

const SYMBOL_CLASSES = new Set(['Icon', 'ButtonIcon', 'CardIcon', 'StepCheck', 'TimeChipIcon', 'DialogTipIcon', 'symbol'])
const SKIPPED = new Set(['script', 'style', 'select', 'option', 'svg', 'header', 'footer', 'link', 'meta'])
const INLINE = new Set(['a', 'span', 'strong', 'em', 'b', 'i', 'br', 'code'])
const PASS_TAGS = new Set(['div', 'p', 'span', 'strong', 'em', 'b', 'i', 'br', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'label', 'code', 'details', 'summary'])
const BUTTON_VARIANTS = { secondary: 'primary', stadiasecondary: 'outlined', stadiatext: 'text' }
const GLYPHS = { btna: 'A', btny: 'Y' }

function classTokens(element) {
  return [...element.classList].filter((token) => !/^Grid/.test(token))
}

function isInline(node) {
  if (node.nodeType !== 1) return true
  return INLINE.has(node.localName) || node.classList.contains('ControllerButton')
}

function symbolName(element) {
  if (element.children.length) return null
  const text = element.textContent.trim()
  if (!/^[a-z][a-z0-9_]*$/.test(text)) return null
  if (![...element.classList].some((token) => SYMBOL_CLASSES.has(token))) return null
  return text
}

function Mirror({ node, ctx, keyId }) {
  if (node.nodeType === 3) {
    const text = translate(node.textContent, ctx.language)
    return text
  }
  if (node.nodeType !== 1) return null
  const tag = node.localName
  if (SKIPPED.has(tag)) return null
  if (node.classList.contains('BTRing') || node.classList.contains('DogfoodOnlyLabel')) return null
  if (node.id === 'panel-bottom-button-bar' || node.hasAttribute('data-fl-skip')) return null

  const name = symbolName(node)
  if (name) {
    const Icon = SYMBOLS[name]
    return Icon ? <Icon key={keyId} className={`fl-symbol fl-${node.classList[0]}`} aria-hidden="true" /> : null
  }

  if (node.classList.contains('ControllerButton')) {
    const label = translateLabel(node.getAttribute('aria-label') || '', ctx.language)
    const glyph = [...node.classList].map((token) => GLYPHS[token]).find(Boolean)
    const Icon = glyph ? null : SYMBOLS[node.textContent.trim()] || MdMoreHoriz
    return (
      <span key={keyId} className={`fl-ControllerButton fl-${[...node.classList].filter((token) => token !== 'ControllerButton').join(' fl-')}`} role="img" aria-label={label}>
        {glyph || <Icon aria-hidden="true" />}
      </span>
    )
  }

  if (tag === 'button') return <MirrorButton key={keyId} node={node} ctx={ctx} />
  if (tag === 'a') return <MirrorLink key={keyId} node={node} ctx={ctx} />

  if (tag === 'img') {
    return <img key={keyId} className={classTokens(node).map((token) => `fl-${token}`).join(' ')} src={node.currentSrc || node.src} alt={translateAlt(node.getAttribute('alt') || '', ctx.language)} style={node.style.aspectRatio ? { aspectRatio: node.style.aspectRatio } : undefined} />
  }

  if (tag === 'progress') {
    const hasValue = node.hasAttribute('value')
    return (
      <progress
        key={keyId}
        className={classTokens(node).map((token) => `fl-${token}`).join(' ')}
        value={hasValue ? Number(node.getAttribute('value')) : undefined}
        max={hasValue ? Number(node.getAttribute('max') || 100) : undefined}
        aria-label={translateLabel(node.getAttribute('aria-label') || '', ctx.language)}
      />
    )
  }

  if (tag === 'input') {
    if (node.type !== 'checkbox') return null
    return <input key={keyId} id={node.id || undefined} type="checkbox" checked={node.checked} disabled={node.disabled} onChange={(event) => setEngineCheckbox(node, event.target.checked)} />
  }

  if (tag === 'dialog') return <MirrorChildren key={keyId} node={node} ctx={ctx} />

  const type = PASS_TAGS.has(tag) ? tag : 'div'
  const props = { key: keyId, className: classTokens(node).map((token) => `fl-${token}`).join(' ') || undefined }
  const role = node.getAttribute('role')
  if (role) props.role = role
  const label = node.getAttribute('aria-label')
  if (label) props['aria-label'] = translateLabel(label, ctx.language)
  const selected = node.getAttribute('aria-selected')
  if (selected) props['aria-selected'] = selected
  if (node.getAttribute('aria-hidden') === 'true') props['aria-hidden'] = true
  if (node.hasAttribute('for')) props.htmlFor = node.getAttribute('for')
  if (node.id && tag !== 'div') props.id = node.id
  if (tag === 'br') return createElement('br', { key: keyId })
  return createElement(type, props, <MirrorChildren node={node} ctx={ctx} />)
}

function MirrorChildren({ node, ctx }) {
  const kids = []
  for (const child of node.childNodes) {
    if (child.nodeType !== 3 && child.nodeType !== 1) continue
    const last = kids[kids.length - 1]
    if (child.nodeType === 3 && last?.nodeType === 3) kids[kids.length - 1] = { nodeType: 3, textContent: last.textContent + child.textContent }
    else kids.push(child)
  }
  const elements = kids.filter((child) => child.nodeType === 1)
  const hasText = kids.some((child) => child.nodeType === 3 && child.textContent.trim())

  if (ctx.language === 'it' && hasText && elements.some((element) => !symbolName(element)) && kids.every(isInline)) {
    let index = 0
    const key = normalize(kids.map((child) => (child.nodeType === 3 ? child.textContent : `{${index++}}`)).join(''))
    const template = lookupTemplate(key, ctx.language)
    if (template) {
      return template.split(/(\{\d+\})/).map((piece, position) => {
        const slot = piece.match(/^\{(\d+)\}$/)
        if (!slot) return piece
        const target = elements[Number(slot[1])]
        return target ? <Mirror key={position} node={target} ctx={ctx} keyId={position} /> : null
      })
    }
    reportMissing(key)
  }

  return kids.map((child, position) => <Mirror key={position} node={child} ctx={ctx} keyId={position} />)
}

function MirrorButton({ node, ctx }) {
  const tokens = [...node.classList].filter((token) => token !== 'Button')
  const variants = tokens.map((token) => BUTTON_VARIANTS[token] || token)
  const disabled = node.disabled || node.hasAttribute('disabled')
  const action = actionOf(node)
  const onClick = (event) => {
    event.preventDefault()
    triggerEngine(node, event.nativeEvent)
  }
  return (
    <button type="button" className={`Button ${variants.join(' ')}`} disabled={disabled} data-action={action} aria-label={translateLabel(node.getAttribute('aria-label') || '', ctx.language) || undefined} onClick={onClick}>
      <MirrorChildren node={node} ctx={ctx} />
    </button>
  )
}

function MirrorLink({ node, ctx }) {
  const action = actionOf(node)
  if (action) {
    const onClick = (event) => {
      event.preventDefault()
      triggerEngine(node, event.nativeEvent)
    }
    return (
      <button type="button" className="fl-link" data-action={action} onClick={onClick}>
        <MirrorChildren node={node} ctx={ctx} />
      </button>
    )
  }
  const href = node.getAttribute('href')
  if (!href || href === '#') return <MirrorChildren node={node} ctx={ctx} />
  return (
    <a className="fl-link" href={href} target="_blank" rel="noopener noreferrer">
      <MirrorChildren node={node} ctx={ctx} />
    </a>
  )
}

export function MirrorNodes({ nodes, language }) {
  const ctx = { language }
  return nodes.map((node, index) => <Mirror key={index} node={node} ctx={ctx} keyId={index} />)
}

export function MirrorContents({ node, language }) {
  return <MirrorChildren node={node} ctx={{ language }} />
}
