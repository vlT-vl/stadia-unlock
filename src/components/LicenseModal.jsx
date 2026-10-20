import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { MdGavel } from 'react-icons/md'
import { HiArrowLeft, HiXMark } from 'react-icons/hi2'
import '../css/licensemodal.css'

export default function LicenseModal({ text, onBack, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const appRoot = document.getElementById('root')
    const previousAriaHidden = appRoot?.getAttribute('aria-hidden')
    const hadInert = appRoot?.hasAttribute('inert')
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
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
    <div className="lmo-overlay" onClick={onClose}>
      <section ref={dialogRef} className="lmo-card" role="dialog" aria-modal="true" aria-labelledby="license-modal-title" aria-describedby="license-modal-description" tabIndex="-1" onClick={(event) => event.stopPropagation()}>
        <header className="lmo-header">
          <div className="lmo-heading">
            <MdGavel className="lmo-icon" aria-hidden="true" />
            <div>
              <span className="lmo-eyebrow">{text.eyebrow}</span>
              <h2 id="license-modal-title">{text.title}</h2>
            </div>
          </div>
          <button ref={closeButtonRef} className="lmo-close" type="button" onClick={onClose} aria-label={text.close}>
            <HiXMark aria-hidden="true" />
          </button>
        </header>
        <div className="lmo-body">
          <p className="lmo-intro" id="license-modal-description">{text.intro}</p>
          <pre className="lmo-license">{text.terms}</pre>
          <p className="lmo-scope">{text.scope}</p>
        </div>
        <footer className="lmo-footer">
          <button className="Button text icon" type="button" onClick={onBack}>
            <span className="ButtonText"><HiArrowLeft className="ButtonIcon" aria-hidden="true" />{text.back}</span>
          </button>
          <button className="Button brand" type="button" onClick={onClose}>
            <span className="ButtonText">{text.close}</span>
          </button>
        </footer>
      </section>
    </div>,
    document.body
  )
}
