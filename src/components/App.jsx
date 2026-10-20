import { useCallback, useEffect, useState } from 'react'
import TopNav from './TopNav.jsx'
import Hero from './Hero.jsx'
import KeyThings from './KeyThings.jsx'
import HowItWorks from './HowItWorks.jsx'
import Faq from './Faq.jsx'
import LegalNotice from './LegalNotice.jsx'
import Footer from './Footer.jsx'
import VersionModal from './VersionModal.jsx'
import ActionModal from './ActionModal.jsx'
import LicenseModal from './LicenseModal.jsx'
import GuideModal from './GuideModal.jsx'
import Flasher from './Flasher.jsx'
import { getInitialLanguage, saveLanguage, UI_TEXT } from '../uitext.js'

export default function App() {
  const [showInfo, setShowInfo] = useState(false)
  const [showLicense, setShowLicense] = useState(false)
  const [guideSection, setGuideSection] = useState(null)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [modalKind, setModalKind] = useState(null)
  const [flasherIntent, setFlasherIntent] = useState(null)
  const text = UI_TEXT[language]

  const getFlasherState = useCallback(() => {
    if (!window.isSecureContext) return 'insecure'
    const supportsWebHid = typeof navigator.hid?.requestDevice === 'function'
    const supportsWebUsb = typeof navigator.usb?.requestDevice === 'function'
    return supportsWebHid || supportsWebUsb ? 'supported' : 'unsupported'
  }, [])

  const openControllerAction = useCallback((intent) => {
    const support = getFlasherState()
    setShowInfo(false)
    setShowLicense(false)
    if (support === 'supported') {
      setFlasherIntent(typeof intent === 'string' ? intent : 'switch')
      return
    }
    setModalKind(support)
  }, [getFlasherState])

  const closeFlasher = useCallback(() => setFlasherIntent(null), [])

  const openGuide = useCallback((section) => {
    setShowInfo(false)
    setShowLicense(false)
    setModalKind(null)
    setGuideSection(typeof section === 'string' ? section : 'verify')
  }, [])

  const closeGuide = useCallback(() => setGuideSection(null), [])

  const startFromGuide = useCallback(() => {
    setGuideSection(null)
    openControllerAction('switch')
  }, [openControllerAction])

  const openPairing = useCallback(() => {
    setShowInfo(false)
    setShowLicense(false)
    setModalKind('pairing')
  }, [])

  const openInfo = useCallback(() => {
    setModalKind(null)
    setShowLicense(false)
    setShowInfo(true)
  }, [])

  const closeInfo = useCallback(() => setShowInfo(false), [])
  const closeAction = useCallback(() => setModalKind(null), [])
  const openLicense = useCallback(() => {
    setShowInfo(false)
    setModalKind(null)
    setShowLicense(true)
  }, [])
  const closeLicense = useCallback(() => setShowLicense(false), [])
  const returnToInfo = useCallback(() => {
    setShowLicense(false)
    setShowInfo(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'it' ? 'it' : 'en'
    document.title = text.document.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', text.document.description)
    saveLanguage(language)
  }, [language, text])

  useEffect(() => {
    const support = getFlasherState()
    if (support !== 'supported') setModalKind(support)
  }, [getFlasherState])

  const modalContent = modalKind
    ? {
        ...text.modal[modalKind === 'insecure' ? 'unsupported' : modalKind],
        body: modalKind === 'insecure' ? text.modal.unsupported.insecureBody : text.modal[modalKind].body,
        href: modalKind === 'unsupported' || modalKind === 'insecure'
          ? 'https://www.google.com/chrome/'
          : 'https://support.google.com/stadia/answer/13067284',
      }
    : null

  return (
    <div className="AppContainer">
      <TopNav text={text.nav} language={language} onLanguageChange={setLanguage} onInfo={openInfo} />
      <div className="PageContents page-home">
        <div className="BTRing BTRing__Small" aria-hidden="true"></div>
        <div className="BTRing BTRing__Medium" aria-hidden="true"></div>
        <div className="BTRing BTRing__Large" aria-hidden="true"></div>
        <main>
          <div className="Grid MainContentContainer">
            <Hero text={text.hero} onControllerAction={openControllerAction} />
            <KeyThings text={text.keyThings} onControllerAction={openControllerAction} />
            <HowItWorks text={text.howItWorks} onOpenGuide={openGuide} />
            <Faq text={text.faq} onControllerAction={openControllerAction} onPairing={openPairing} />
            <LegalNotice text={text.legal} />
          </div>
        </main>
        <Footer text={text.footer} />
      </div>
      {showInfo && <VersionModal text={text.modal} onOpenLicense={openLicense} onClose={closeInfo} />}
      {showLicense && <LicenseModal text={text.modal.license} onBack={returnToInfo} onClose={closeLicense} />}
      {guideSection && <GuideModal text={text.flowGuide} initialSection={guideSection} onStart={startFromGuide} onClose={closeGuide} />}
      {flasherIntent && <Flasher text={text.flasher} productName={text.nav.product} language={language} intent={flasherIntent} onClose={closeFlasher} />}
      {modalContent && (
        <ActionModal content={modalContent} kind={modalKind === 'insecure' ? 'unsupported' : modalKind} closeLabel={text.modal.close} onClose={closeAction} />
      )}
    </div>
  )
}
