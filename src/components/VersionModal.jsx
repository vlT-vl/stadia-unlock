import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiInfo } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import { HiXMark } from 'react-icons/hi2'
import VltLogo from './VltLogo.jsx'
import StadiaUnlockLogo from './StadiaUnlockLogo.jsx'
import pkgjson from '../../package.json'
import '../css/versionmodal.css'

const stripCaret = (v) => v?.replace(/^[\^~]/, '') ?? '—'

const STACK = [
  { label: 'React', value: stripCaret(pkgjson.dependencies.react) },
  { label: 'Vite', value: stripCaret(pkgjson.devDependencies.vite) },
  { label: 'React Icons', value: stripCaret(pkgjson.dependencies['react-icons']) },
]

export default function VersionModal({ text, onOpenLicense, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const appRoot = document.getElementById('root')
    const previousAriaHidden = appRoot?.getAttribute('aria-hidden')
    const hadInert = appRoot?.hasAttribute('inert')
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) {
        e.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    appRoot?.setAttribute('inert', '')
    appRoot?.setAttribute('aria-hidden', 'true')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (!hadInert) appRoot?.removeAttribute('inert')
      if (previousAriaHidden === null) appRoot?.removeAttribute('aria-hidden')
      else if (previousAriaHidden !== undefined) appRoot?.setAttribute('aria-hidden', previousAriaHidden)
      previousFocus?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="vmo-overlay" onClick={onClose}>
      <div ref={dialogRef} className="vmo-card" role="dialog" aria-modal="true" aria-labelledby="version-modal-title" aria-describedby="version-modal-description" tabIndex="-1" onClick={(e) => e.stopPropagation()}>
        <div className="vmo-header">
          <div className="vmo-header-left">
            <FiInfo className="vmo-header-icon" aria-hidden="true" />
            <div>
              <span className="vmo-eyebrow" id="version-modal-title">{text.info.eyebrow}</span>
              <span className="vmo-subtitle">
                v{pkgjson.version} · {pkgjson.build} · {pkgjson.updated}
              </span>
            </div>
          </div>
          <button ref={closeButtonRef} className="vmo-close" type="button" onClick={onClose} aria-label={text.close}>
            <HiXMark aria-hidden="true" />
          </button>
        </div>

        <div className="vmo-body">
          <div className="vmo-logo-wrap">
            <StadiaUnlockLogo layout="stacked" size="medium" />
          </div>

          <div className="vmo-grid">
            <div className="vmo-field">
              <span className="vmo-field-label">{text.info.version}</span>
              <span className="vmo-field-value">{pkgjson.version}</span>
            </div>
            <div className="vmo-field">
              <span className="vmo-field-label">{text.info.build}</span>
              <span className="vmo-field-value">{pkgjson.build}</span>
            </div>
            <div className="vmo-field">
              <span className="vmo-field-label">{text.info.updated}</span>
              <span className="vmo-field-value">{pkgjson.updated}</span>
            </div>
          </div>

          <div className="vmo-grid">
            {STACK.map((s) => (
              <div className="vmo-field" key={s.label}>
                <span className="vmo-field-label">{s.label}</span>
                <span className="vmo-field-value">{s.value}</span>
              </div>
            ))}
          </div>

          <p className="vmo-notice" id="version-modal-description">{text.info.notice}</p>

          <button className="vmo-license-button" type="button" onClick={onOpenLicense}>
            <MdGavel aria-hidden="true" />
            <span>{text.info.license}</span>
          </button>

          <a
            className="vmo-vlt-link"
            href="https://lorenzoveronesi.it"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="lorenzoveronesi.it"
          >
            <VltLogo size="2.1rem" staticExpanded />
          </a>

          <p className="vmo-notice vmo-notice--copy">
            {text.info.copyright}
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
