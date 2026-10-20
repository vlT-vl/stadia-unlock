const START_ACTIONS = {
  switch: 'click:selectBruce',
  check: 'click:checkMode',
  select: 'click:selectAction',
}

const SAFE_ACTIONS = new Set([
  'click:closeDialog',
  'click:returnHome',
  'click:cancelAndExit',
  'click:gettingStartedModal1',
  'click:gettingStartedModal2',
  'click:helpCenter',
  'click:downloadChrome',
  'click:updateChrome',
  'click:agreeToTerms',
  'click:selectAction',
  'click:selectBruce',
  'click:checkMode',
  'click:openUdevInstructions',
  'change:dialogCheckboxChange',
])

export function engineDocument(frame) {
  try {
    return frame?.contentDocument || null
  } catch {
    return null
  }
}

export function readEngine(doc) {
  if (!doc) return null
  const scroll = doc.getElementById('main-scroll-container')
  const dialog = doc.getElementById('active-dialog')
  const container = doc.querySelector('#app-container main .MainContentContainer')
  const bar = doc.getElementById('panel-bottom-button-bar')
  const home = !!scroll && scroll.classList.contains('page-home')
  const busy = !!doc.querySelector('#app-container progress')
  return { home, dialog, container, bar, busy, ready: !!doc.getElementById('app-container') }
}

export function actionOf(element) {
  const attribute = element.getAttribute('jsaction') || ''
  return attribute.split(';')[0].trim()
}

export function startEngine(doc, intent) {
  const action = START_ACTIONS[intent] || START_ACTIONS.switch
  const target = doc?.querySelector(`[jsaction*="${action}"]`)
  if (!target) return false
  target.click()
  return true
}

export function triggerEngine(element, event) {
  const action = actionOf(element)
  if (!action) return false
  if (!SAFE_ACTIONS.has(action) && event?.isTrusted !== true) return false
  if (element.disabled || element.hasAttribute('disabled')) return false
  element.click()
  return true
}

export function setEngineCheckbox(element, checked) {
  if (!element || element.disabled) return
  element.checked = checked
  element.dispatchEvent(new Event('change', { bubbles: true }))
}

export function observeEngine(doc, callback) {
  const target = doc.getElementById('app-container') || doc.body
  let frame = 0
  const run = () => {
    frame = 0
    callback()
  }
  const observer = new MutationObserver(() => {
    if (!frame) frame = requestAnimationFrame(run)
  })
  observer.observe(target, { childList: true, subtree: true, attributes: true, characterData: true })
  return () => {
    observer.disconnect()
    if (frame) cancelAnimationFrame(frame)
  }
}
