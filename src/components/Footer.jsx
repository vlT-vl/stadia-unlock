import StadiaUnlockLogo from './StadiaUnlockLogo.jsx'
import VltLogo from './VltLogo.jsx'
import '../css/footer.css'

export default function Footer({ text }) {
  return (
    <footer className="Footer Entrance Entrance--4">
      <div className="FooterContent">
        <div className="FooterBrand">
          <StadiaUnlockLogo layout="inline" size="compact" />
          <span className="FooterBrandDivider" aria-hidden="true"></span>
          <span className="FooterProjectBy">{text.projectBy}</span>
          <a className="FooterVltLink" href="https://lorenzoveronesi.it" target="_blank" rel="noopener noreferrer" aria-label="vlT — lorenzoveronesi.it">
            <VltLogo size="1.65rem" staticExpanded />
          </a>
        </div>
      </div>
    </footer>
  )
}
