import { MdToggleOn, MdCalendarToday, MdArrowRightAlt } from 'react-icons/md'
import '../css/keythings.css'

export default function KeyThings({ text, onControllerAction }) {
  return (
    <div className="KeyThingsArea GridSpan10Center GridSmSpanFull GridXsSpanFull Entrance Entrance--2">
      <h2 className="KeyThingsTitle">{text.title}</h2>
      <div className="KeyThingsCardContainer">
        <div className="KeyThingCard">
          <div className="IconAndText">
            <div className="Icon" aria-hidden="true">
              <MdToggleOn className="CardIcon" />
            </div>
            <div className="Text">
              <h3 className="Heading">{text.permanentTitle}</h3>
              <div className="Content">
                {text.permanentBody}
              </div>
            </div>
          </div>
          <div className="Bottom">
            <button className="Button text icon" type="button" onClick={() => onControllerAction('switch')}>
              <span className="ButtonText">
                {text.switchAction}
                <MdArrowRightAlt className="ButtonIcon" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
        <div className="KeyThingCard">
          <div className="IconAndText">
            <div className="Icon" aria-hidden="true">
              <MdCalendarToday className="CardIcon" />
            </div>
            <div className="Text">
              <h3 className="Heading">{text.availabilityTitle}</h3>
              <div className="Content">{text.availabilityBody}</div>
            </div>
          </div>
          <div className="Bottom">
            <button className="Button text icon" type="button" onClick={() => onControllerAction('select')}>
              <span className="ButtonText">
                {text.modeAction}
                <MdArrowRightAlt className="ButtonIcon" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
