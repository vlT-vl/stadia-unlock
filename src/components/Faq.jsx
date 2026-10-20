import { useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import '../css/faq.css'

export default function Faq({ text, onControllerAction, onPairing }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="FaqArea GridSpan8Center GridSmSpanFull GridXsSpanFull Entrance Entrance--3">
      <h2 className="FaqAreaTitle">{text.title}</h2>
      <div className="FaqItemList">
        {text.items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div className="FaqItem" key={item.question}>
              <button className="FaqQuestionHeader" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)}>
                <span className="FaqQuestion">{item.question}</span>
                {isOpen ? <MdExpandLess className="FaqChevron" aria-hidden="true" /> : <MdExpandMore className="FaqChevron" aria-hidden="true" />}
              </button>
              {isOpen && (
                <div className="FaqAnswer" id={`faq-answer-${index}`}>
                  {item.answer}
                  {item.linkLabel && item.href && <p><a href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel}</a></p>}
                  {item.linkLabel && item.action && (
                    <p><button className="FaqInlineAction" type="button" onClick={() => (item.action === 'pairing' ? onPairing() : onControllerAction(item.action))}>{item.linkLabel}</button></p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
