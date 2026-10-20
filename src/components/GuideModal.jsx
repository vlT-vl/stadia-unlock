import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { MdArrowRightAlt, MdRoute } from 'react-icons/md'
import { HiXMark } from 'react-icons/hi2'
import '../css/guidemodal.css'

export default function GuideModal({ text, initialSection, onStart, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const bodyRef = useRef(null)

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

  useEffect(() => {
    if (!initialSection || initialSection === 'verify') return
    const target = bodyRef.current?.querySelector(`#guide-${initialSection}`)
    target?.scrollIntoView({ block: 'start' })
  }, [initialSection])

  const jumpTo = (id) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    bodyRef.current?.querySelector(`#guide-${id}`)?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
  }

  return createPortal(
    <div className="gmo-overlay" onClick={onClose}>
      <section ref={dialogRef} className="gmo-card" role="dialog" aria-modal="true" aria-labelledby="guide-modal-title" aria-describedby="guide-modal-description" tabIndex="-1" onClick={(event) => event.stopPropagation()}>
        <header className="gmo-header">
          <div className="gmo-heading">
            <MdRoute className="gmo-icon" aria-hidden="true" />
            <div>
              <span className="gmo-eyebrow">{text.eyebrow}</span>
              <h2 id="guide-modal-title">{text.title}</h2>
            </div>
          </div>
          <button ref={closeButtonRef} className="gmo-close" type="button" onClick={onClose} aria-label={text.close}>
            <HiXMark aria-hidden="true" />
          </button>
        </header>
        <nav className="gmo-toc" aria-label={text.tocLabel}>
          {text.sections.map((section) => (
            <button key={section.id} className="gmo-chip" type="button" onClick={() => jumpTo(section.id)}>{section.title}</button>
          ))}
        </nav>
        <div ref={bodyRef} className="gmo-body">
          <p className="gmo-intro" id="guide-modal-description">{text.intro}</p>
          {text.sections.map((section) => (
            <article key={section.id} id={`guide-${section.id}`} className="gmo-section">
              <h3>{section.title}</h3>
              {section.intro && <p className="gmo-lead">{section.intro}</p>}
              {section.steps && (
                <ol className="gmo-steps">
                  {section.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              )}
              {section.items && (
                <ul className="gmo-items">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.note && <p className="gmo-note">{section.note}</p>}
              {section.table && (
                <div className="gmo-table">
                  <h4>{section.table.title}</h4>
                  <table>
                    <thead>
                      <tr>{section.table.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.led}>
                          <td><span className={`gmo-led gmo-led--${row.tone}`} aria-hidden="true"></span>{row.led}</td>
                          <td>{row.meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ))}
        </div>
        <footer className="gmo-footer">
          <button className="Button text" type="button" onClick={onClose}>
            <span className="ButtonText">{text.close}</span>
          </button>
          <button className="Button brand icon" type="button" onClick={onStart}>
            <span className="ButtonText">
              {text.start}
              <MdArrowRightAlt className="ButtonIcon" aria-hidden="true" />
            </span>
          </button>
        </footer>
      </section>
    </div>,
    document.body
  )
}
