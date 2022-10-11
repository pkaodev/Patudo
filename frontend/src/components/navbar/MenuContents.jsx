import { useState } from "react";

import SignInOut from "./SignInOut";
import { useNavigate } from "react-router-dom";

export default function MenuContents({
  setPopup,
  BGProps: { appBGState, setAppBGState },
}) {

  const [musicOn, setMusicOn] = useState(false);



  const navigate = useNavigate();
  return (
    <div className="flex-column menu-content">
      {/* <h2 className={`menu-title ${appBGState === 1 && 'menu-logo--party-mode'}`}>Menu</h2> */}
      <h2 className={`menu-title ${appBGState === 1 ? 'menu-logo--party-mode' : undefined}`}>Menu</h2>
      <button
        onClick={() => {
          navigate("/home");
          setPopup(false);
        }}
      >
        Home
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/find-game");
          setPopup(false);
        }}
      >
        Play Patudo!
      </button>
      <br />
      <SignInOut setPopup={setPopup} />
      <br />

      {/* <div className={appBGState === 1 && 'menu-btn--party-mode--on-holder'}> */}
      <div className={appBGState === 1 ? 'menu-btn--party-mode--on-holder' : undefined}>
      <button
        onClick={() => {
          //!!!temporarily disabled, Minified React error #130
          setAppBGState(appBGState === 0 ? 1 : 0);
          // setPopup(false);
        }}
        className="flex-row"
      >
        Party mode:<div>&nbsp;</div> <div className={`${appBGState === 1 ? 'menu-btn--party-mode--on2' : undefined}`}><p className={`flex-row menu-btn--party-mode ${appBGState === 1 ? 'menu-btn--party-mode--on1' : undefined}`}>{appBGState ? "On" : "Off"}</p></div>
      </button>
      </div>
      warning -  sound!
      <br />
      <br />
    </div>
  );
}
