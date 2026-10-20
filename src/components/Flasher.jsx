import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiAlertTriangle } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import { MirrorContents, MirrorNodes } from './EngineMirror.jsx'
import StadiaUnlockLogo from './StadiaUnlockLogo.jsx'
import { ENGINE_URL, verifyEngineFiles } from '../flasher/integrity.js'
import { engineDocument, observeEngine, readEngine, startEngine, triggerEngine } from '../flasher/engine.js'
import '../css/flasher.css'

const BOOT_TIMEOUT_MS = 15000

export default function Flasher({ text, productName, language, intent, onClose }) {
  const frameRef = useRef(null)
  const shellRef = useRef(null)
  const lastFocusRef = useRef(null)
  const startedRef = useRef(false)
  const stopRef = useRef(null)
  const sawContentRef = useRef(false)
  const [phase, setPhase] = useState('verifying')
  const [failedFiles, setFailedFiles] = useState([])
  const [, setTick] = useState(0)

  const state = readEngine(engineDocument(frameRef.current))
  const busy = !!state?.busy
  const hasContent = !!state && (!state.home || !!state.dialog)
  if (hasContent) sawContentRef.current = true

  useEffect(() => {
    let cancelled = false
    verifyEngineFiles().then((result) => {
      if (cancelled) return
      if (result.ok) setPhase('loading')
      else {
        setFailedFiles(result.failed.map((entry) => entry.path))
        setPhase('failed')
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (phase !== 'loading' && phase !== 'running') return undefined
    const timer = window.setTimeout(() => {
      if (!sawContentRef.current) setPhase('engine-error')
    }, BOOT_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  const restoreFocus = useCallback(() => {
    const frame = frameRef.current
    if (!frame || document.activeElement !== frame) return
    const target = lastFocusRef.current && shellRef.current?.contains(lastFocusRef.current) ? lastFocusRef.current : shellRef.current
    target?.focus()
  }, [])

  const onFrameLoad = useCallback(() => {
    const doc = engineDocument(frameRef.current)
    const ready = !!doc?.getElementById('app-container')
    if (!ready) {
      setPhase('engine-error')
      return undefined
    }
    startedRef.current = true
    setPhase('running')
    const stop = observeEngine(doc, () => {
      restoreFocus()
      setTick((value) => value + 1)
    })
    stopRef.current?.()
    stopRef.current = stop
    if (!startEngine(doc, intent)) setPhase('engine-error')
    setTick((value) => value + 1)
    return undefined
  }, [intent, restoreFocus])

  useEffect(() => () => stopRef.current?.(), [])

  useEffect(() => {
    if (!startedRef.current || !sawContentRef.current || !state) return
    if (state.home && !state.dialog) onClose()
  })

  useEffect(() => {
    if (!busy) return undefined
    const guard = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', guard)
    return () => window.removeEventListener('beforeunload', guard)
  }, [busy])

  const requestClose = useCallback(() => {
    if (busy) return
    const doc = engineDocument(frameRef.current)
    const exit = doc?.querySelector('[jsaction*="click:cancelAndExit"], [jsaction*="click:returnHome"]')
    if (exit && state && !state.dialog) {
      triggerEngine(exit, null)
      return
    }
    if (state?.dialog) {
      const dismiss = state.dialog.querySelector('[jsaction*="click:closeDialog"]')
      if (dismiss) {
        triggerEngine(dismiss, null)
        return
      }
    }
    onClose()
  }, [busy, onClose, state])

  useLayoutEffect(() => {
    const appRoot = document.getElementById('root')
    const previousFocus = document.activeElement
    appRoot?.setAttribute('inert', '')
    appRoot?.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = 'hidden'
    shellRef.current?.focus()
    return () => {
      appRoot?.removeAttribute('inert')
      appRoot?.removeAttribute('aria-hidden')
      document.body.style.overflow = ''
      previousFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
      }
    }
    const onFocusIn = (event) => {
      if (shellRef.current?.contains(event.target)) lastFocusRef.current = event.target
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [requestClose])

  const contentNodes = state?.container ? [...state.container.children].filter((child) => child.id !== 'panel-bottom-button-bar') : []
  const barInner = state?.bar?.querySelector('.PanelBottomButtonBar__InnerContainer')

  let body
  if (phase === 'verifying') body = <Notice text={text.verifying} />
  else if (phase === 'failed') {
    body = (
      <Problem
        title={text.integrityTitle}
        body={text.integrityBody}
        detail={`${text.integrityDetail}: ${failedFiles.join(', ')}`}
        action={text.reload}
        onAction={() => window.location.reload()}
      />
    )
  } else if (phase === 'engine-error') {
    body = <Problem title={text.engineTitle} body={text.engineBody} action={text.reload} onAction={() => window.location.reload()} />
  } else if (!hasContent) body = <Notice text={text.loading} />
  else if (state.container && !state.home) body = <MirrorNodes nodes={contentNodes} language={language} />
  else body = <Notice text={text.loading} />

  const showEngine = phase === 'loading' || phase === 'running'

  return createPortal(
    <div className="fl-root" ref={shellRef} role="dialog" aria-modal="true" aria-label={text.title} tabIndex="-1">
      <header className="fl-top">
        <div className="fl-brand">
          <StadiaUnlockLogo layout="inline" size="compact" />
          <span className="fl-divider" aria-hidden="true"></span>
          <span className="fl-product">{productName}</span>
        </div>
        <button className="fl-close" type="button" onClick={requestClose} disabled={busy} aria-label={busy ? text.closeLocked : text.close} title={busy ? text.closeLocked : text.close}>
          <HiXMark aria-hidden="true" />
        </button>
      </header>
      <main className="fl-main" aria-live="polite">
        <div className="fl-panel">{body}</div>
      </main>
      {busy && <p className="fl-busy" role="status">{text.busyNotice}</p>}
      {barInner && phase === 'running' && (
        <footer className="fl-bar">
          <div className="fl-bar-inner">
            <MirrorContents node={barInner} language={language} />
          </div>
        </footer>
      )}
      {state?.dialog && (
        <div className="fl-dialog-overlay">
          <section className="fl-dialog" role="dialog" aria-modal="true" aria-labelledby="active-dialog-title" aria-describedby="active-dialog-description">
            <MirrorContents node={state.dialog} language={language} />
          </section>
        </div>
      )}
      {showEngine && <iframe ref={frameRef} className="fl-engine" src={ENGINE_URL} title="engine" tabIndex="-1" aria-hidden="true" onLoad={onFrameLoad} />}
    </div>,
    document.body
  )
}

function Notice({ text }) {
  return (
    <div className="fl-notice" role="status">
      <span className="fl-spinner" aria-hidden="true"></span>
      <p>{text}</p>
    </div>
  )
}

function Problem({ title, body, detail, action, onAction }) {
  return (
    <div className="fl-problem" role="alert">
      <div className="fl-problem-icon" aria-hidden="true"><FiAlertTriangle /></div>
      <h1>{title}</h1>
      <p>{body}</p>
      {detail && <p className="fl-problem-detail">{detail}</p>}
      <button className="Button brand" type="button" onClick={onAction}>
        <span className="ButtonText">{action}</span>
      </button>
    </div>
  )
}
