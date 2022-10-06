import PrivateRoute from "../authentication/PrivateRoute";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";
import {
  autoSubscribeToGame,
  autoSubscribeToPrivate,
} from "../../firebase/firebaseFunctionsFE";
import { ContextGame } from "../../CONTEXTS";
import InfoArea from "./infoarea/InfoArea.jsx";
import TableArea from "./tablearea/TableArea.jsx";
import OwnCupArea from "./owncuparea/OwnCupArea.jsx";
import DecisionArea from "./decisionarea/DecisionArea.jsx";
import LoserArea from "./loserarea/LoserArea";


  const mockGameState = {
    admin: '',
    currentBet: '1,0',
    createdAt: '',
    currentPlayer: 0,
    isOver: null,
    isPacifico: false,
    losers: [{nickname: '', uid: '', numberOfDice: 0}],
    players: [{nickname: '', uid: '', numberOfDice: 0}],
    round: 0,
    text: [],
    moveNumber: 0,
  }

export default function PAGE_Game() {
  const { currentUser } = useAuth();
  const { gameCode } = useParams();
  const [gameState, setGameState] = useState(mockGameState);
  const [privateState, setPrivateState] = useState([]);




  //extract these into hooks - unsubscribe with return!!!
  useEffect(() => {
    autoSubscribeToGame(gameCode, currentUser.uid, setGameState);
  }, []);

  useEffect(() => {
    autoSubscribeToPrivate(gameCode, currentUser.uid, setPrivateState);
  }, []);

  return (
    <PrivateRoute>
      <ContextGame.Provider value={{gameState, privateState}}>
        <div className="take-up-whole-space">
          <InfoArea />
          <TableArea />
          {
            gameState.players.some((player) => player.uid === currentUser.uid) ?
            <>
            <OwnCupArea />
            <DecisionArea />
            </>
            :
            <LoserArea />
          }
        </div>
      </ContextGame.Provider>
    </PrivateRoute>
  );
}
