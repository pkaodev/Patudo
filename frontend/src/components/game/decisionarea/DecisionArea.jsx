// import { ContextGame } from "../../../CONTEXTS.js";
import Bet from "./Bet";
import BS from "./BS";
import Cabbages from "./Cabbages";
import { ContextGame } from "../../../CONTEXTS";
import { useAuth } from "../../../firebase/AuthContext";
import { useContext, useState } from "react";
import { findValidMoves } from "../../../hooks+utils/utilsDecisionArea";


export default function DecisionArea() {

  const { gameState } = useContext(ContextGame);
  const { currentUser } = useAuth();

  const validMoves = findValidMoves(gameState, currentUser.uid);



  return (
    <div className="decision-area-holder flex-row" >
      <div className={`decision-area flex-row ${gameState.players[gameState.currentPlayer]?.uid === currentUser.uid ? "current-border" : ""}`} >
        {
          gameState.isOver ?
          <div className="winner-avatar-message flex-column">Victory!</div> :
          <>
        <Bet isValid={validMoves.bet} />
        <div className="bs-cabbages-holder flex-column">
        <BS isValid={validMoves.bs} />
        <Cabbages isValid={validMoves.cabbages}/>
        </div>
          </>
        }
      </div>
    </div>
  );
}
