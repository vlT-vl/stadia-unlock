import { useEffect, useRef, useState } from 'react'
import { MdArrowRightAlt } from 'react-icons/md'
import controllerImg from '../assets/controller-1x.webp'
import StadiaUnlockLogo from './StadiaUnlockLogo.jsx'
import '../css/hero.css'

export default function Hero({ text, onControllerAction }) {
  const controllerRef = useRef(null)
  const [controllerVisible, setControllerVisible] = useState(false)

  useEffect(() => {
    if (!controllerRef.current || !('IntersectionObserver' in window)) {
      setControllerVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setControllerVisible(true)
      observer.disconnect()
    }, { threshold: 0.22 })

    observer.observe(controllerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="HeroContentContainer GridSpanFull Entrance Entrance--1">
      <div className="HeroContent">
        <StadiaUnlockLogo layout="stacked" size="large" className="HeroProjectLogo" />
        <h1>{text.title}</h1>
        <p className="HeroSubtitle">
          {text.subtitle}
        </p>
        <div className="ButtonAndMetatext">
          <button className="Button brand icon" id="main-call-to-action" type="button" aria-label={text.action} onClick={() => onControllerAction('switch')}>
            <span className="ButtonText">
              {text.action}
              <MdArrowRightAlt className="ButtonIcon" aria-hidden="true" />
            </span>
          </button>
          <div className="Metatext">
            {text.updateNote}<br />
            {text.requirements}
          </div>
        </div>
      </div>
      <div ref={controllerRef} className={`HeroImageReveal GridSpanFull${controllerVisible ? ' is-visible' : ''}`}>
        <img className="HeroImage" src={controllerImg} alt={text.imageAlt} />
      </div>
    </div>
  )
}
