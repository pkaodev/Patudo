// import cancel_white from '../images/patudo/cancel-white.png';
import cancel_black from '../images/patudo/cancel-black.png';

/**
in main:
const [popup, setPopup] = useState(false);

in button to open:
onClick={()=>{setPopup(true)}}

 in return:
 {popup && <Popup setPopup={setPopup} color={'5'}>  //pick color from 1-7 atm
        <HowToPlay />
      </Popup>}

give setPopup as prop to child component to close popup


 */

export default function Popup({ children, setPopup, color }) {

  return (
    <>
      <div className="popup__background">
        <div className={`popup__holder color${color} center-of-screen`}>
          <div className={`popup__close-btn-holder flex-column color${color}`}>
          <img
            className="popup__close-btn"
            onClick={() => {
              setPopup(false);
            }}
            src={cancel_black}
            />
          </div>
          <div className="popup__content lighten-m">
          {children}
            </div>
          </div>
      </div>
    </>
  );
};

