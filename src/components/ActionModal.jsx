import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiAlertTriangle, FiBluetooth } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import '../css/actionmodal.css'

export default function ActionModal({ content, kind, closeLabel, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const Icon = kind === 'pairing' ? FiBluetooth : FiAlertTriangle

  useEffect(() => {
    const previousFocus = document.activeElement
    const appRoot = document.getElementById('root')
    const previousAriaHidden = appRoot?.getAttribute('aria-hidden')
    const hadInert = appRoot?.hasAttribute('inert')
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    appRoot?.setAttribute('inert', '')
    appRoot?.setAttribute('aria-hidden', 'true')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      if (!hadInert) appRoot?.removeAttribute('inert')
      if (previousAriaHidden === null) appRoot?.removeAttribute('aria-hidden')
      else if (previousAriaHidden !== undefined) appRoot?.setAttribute('aria-hidden', previousAriaHidden)
      previousFocus?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="amo-overlay" onMouseDown={onClose}>
      <section ref={dialogRef} className={`amo-card amo-card--${kind}`} role="dialog" aria-modal="true" aria-labelledby="action-modal-title" aria-describedby="action-modal-description action-modal-note" tabIndex="-1" onMouseDown={(event) => event.stopPropagation()}>
        <div className="amo-icon" aria-hidden="true"><Icon /></div>
        <div className="amo-copy">
          <span className="amo-eyebrow">{content.eyebrow}</span>
          <h2 id="action-modal-title">{content.title}</h2>
          <p id="action-modal-description">{content.body}</p>
          <p className="amo-note" id="action-modal-note">{content.note}</p>
        </div>
        <div className="amo-actions">
          <a className="Button brand amo-primary" href={content.href} target="_blank" rel="noopener noreferrer">
            <span className="ButtonText">{content.action}</span>
          </a>
          <button ref={closeButtonRef} className="Button text" type="button" onClick={onClose}>
            <span className="ButtonText">{closeLabel}</span>
          </button>
        </div>
        <button className="amo-close" type="button" onClick={onClose} aria-label={closeLabel}>
          <HiXMark aria-hidden="true" />
        </button>
      </section>
    </div>,
    document.body
  )
}
