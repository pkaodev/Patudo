import PrivateRoute from "../authentication/PrivateRoute";
import JoinLobby from "./JoinLobby";
import MakeLobby from "./MakeLobby";
import Nickname from "./Nickname";
import HowToPlay from "./HowToPlay";
import Popup from "../../hooks+utils/usePopup";

import {useState} from "react";
import {ContextFindGame} from "../../CONTEXTS";


//!!!ADD ERROR message popup/box to show: - ORDER TO BE DONE
// NEED NEW FIRESTORE CALLS:
// 1. if nickname is taken - 7
// 2. if lobby is full - 4
// 3. if lobby is not found - 3
// 3.5 if lobby is already started - 6
// 3.75 if lobby is already finished - 5
// CAN DO ON FE as is:
// 3.9 if nickname too short - 1
// 4. no nickname entered - 2

export default function PAGE_FindGame() {
  const [nickname, setNickname] = useState('');
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState('');


  return (
    <PrivateRoute>
      <section className="page-find-game centre-single-item take-up-whole-space flex-column">
        <form className="find-game-holder flex-row">
          <div>
          <div className="flex-row nickname-holder">
          <Nickname props={{nickname, setNickname}} />
          </div>
          <div className="create-join-holder flex-row">
            <MakeLobby nickname={nickname} />
            <p className="find-game__or flex-row ">Or</p>
            <JoinLobby nickname={nickname} />
          </div>
          </div>
        </form>
        <div className="float1 color2">

          <button className="padding-l" onClick={()=>{setPopup(true)}}>How to play</button>

          </div>

      {popup && <Popup setPopup={setPopup} color={'5'}> 
        <HowToPlay />
      </Popup>}

    </section>





        
        
        
        
  


    </PrivateRoute>
  );
}
