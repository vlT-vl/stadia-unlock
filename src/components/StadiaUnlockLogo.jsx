import logoMark from '../assets/logo-mark.svg'
import '../css/stadiaunlocklogo.css'

export default function StadiaUnlockLogo({ layout = 'inline', size = 'medium', className = '' }) {
  return (
    <div className={`StadiaUnlockLogo StadiaUnlockLogo--${layout} StadiaUnlockLogo--${size} ${className}`.trim()} aria-label="StadiaUnlock">
      <img className="StadiaUnlockLogoMark" src={logoMark} alt="" aria-hidden="true" />
      <span className="StadiaUnlockWordmark" aria-hidden="true">
        <span className="StadiaUnlockWordmarkStadia">Stadia</span>
        <span className="StadiaUnlockWordmarkUnlock">Unlock</span>
      </span>
    </div>
  )
}
