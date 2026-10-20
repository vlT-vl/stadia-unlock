import { useEffect, useRef, useState } from 'react'
import { MdArrowRightAlt, MdBluetoothConnected, MdDownload, MdLockOpen, MdSystemUpdateAlt, MdUsb } from 'react-icons/md'
import '../css/howitworks.css'

const STEP_ICONS = {
  verify: MdUsb,
  unlock: MdLockOpen,
  download: MdDownload,
  install: MdSystemUpdateAlt,
  pairing: MdBluetoothConnected,
}

export default function HowItWorks({ text, onOpenGuide }) {
  const listRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!listRef.current || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { threshold: 0.18 })

    observer.observe(listRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="HowItWorksArea GridSpan10Center GridSmSpanFull GridXsSpanFull Entrance Entrance--3">
      <div className="HowItWorksHeader">
        <h2 className="HowItWorksTitle">{text.title}</h2>
        <p className="HowItWorksSubtitle">{text.subtitle}</p>
      </div>
      <ol ref={listRef} className={`FlowSteps${visible ? ' is-visible' : ''}`} aria-label={text.listLabel}>
        {text.steps.map((step, index) => {
          const Icon = STEP_ICONS[step.id]
          return (
            <li className="FlowStep" key={step.id} style={{ '--i': index }}>
              <button className="FlowStepButton" type="button" aria-haspopup="dialog" title={text.stepHint} onClick={() => onOpenGuide(step.id)}>
                <span className="FlowStepNode" aria-hidden="true">
                  <Icon className="FlowStepIcon" />
                  <span className="FlowStepNumber">{index + 1}</span>
                </span>
                <span className="FlowStepText">
                  <span className="FlowStepTitle">{step.title}</span>
                  <span className="FlowStepSummary">{step.summary}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="HowItWorksActions">
        <button className="Button text icon" type="button" aria-haspopup="dialog" onClick={() => onOpenGuide('verify')}>
          <span className="ButtonText">
            {text.guideAction}
            <MdArrowRightAlt className="ButtonIcon" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  )
}
