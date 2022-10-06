import {useState, useEffect} from 'react'

import startButton_white from '../../images/patudo/power-button-white.png';
import startButton_black from '../../images/patudo/power-button-black.png';

import Popup from "../../hooks+utils/usePopup";
import MenuContents from "./MenuContents";

export default function MenuBtn({BGProps}) {
  const [popup, setPopup] = useState(false);


  return (
    <>
    <div className="menu-holder">
        <img className="menu-btn" src={startButton_black} onClick={()=>{setPopup(true)}}></img>
    </div>
    {popup && <Popup setPopup={setPopup} color={'7'}> 
        <MenuContents setPopup={setPopup} BGProps={BGProps} />
      </Popup>}
    </>
  )
}
