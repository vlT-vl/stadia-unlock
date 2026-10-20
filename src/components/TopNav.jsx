import { FiInfo } from 'react-icons/fi'
import { MdExpandMore, MdLanguage } from 'react-icons/md'
import StadiaUnlockLogo from './StadiaUnlockLogo.jsx'
import '../css/topnav.css'

export default function TopNav({ text, language, onLanguageChange, onInfo }) {
  return (
    <header className="TopNav">
      <div className="LogoArea">
        <StadiaUnlockLogo layout="inline" size="compact" className="TopNavLogo" />
        <div className="Divider"></div>
        <div className="ProductName">{text.product}</div>
      </div>
      <div className="TopNavActions">
        <label className="TopNavLanguage">
          <MdLanguage className="TopNavLanguageIcon" aria-hidden="true" />
          <span className="sr-only">{text.language}</span>
          <select value={language} onChange={(event) => onLanguageChange(event.target.value)} aria-label={text.language}>
            <option value="en">English</option>
            <option value="it">Italiano</option>
          </select>
          <MdExpandMore className="TopNavLanguageChevron" aria-hidden="true" />
        </label>
        <button className="TopNavInfoButton" onClick={onInfo} type="button" aria-label={text.info}>
          <FiInfo aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
