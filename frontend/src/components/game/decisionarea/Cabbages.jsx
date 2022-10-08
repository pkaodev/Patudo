import { apiPUTMove } from "../../../firebase/firebaseFunctionsFE";
import { useState, useContext } from "react";
import { ContextGame } from "../../../CONTEXTS";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../firebase/AuthContext";

export default function Cabbages({isValid}) {
  const { gameState } = useContext(ContextGame);
  const { gameCode } = useParams();
  const { currentUser } = useAuth();

  return (
    <div className="cabbages-holder flex-column">
      <button
        onClick={(e) => {
          apiPUTMove(e, currentUser, gameCode, {
            moveNumber: gameState.moveNumber + 1,
            moveType: "cabbages",
          });
        }}
        disabled={!isValid}
        className={`${!isValid ? "faded-text" : ""}`}
      >
        Cbgs
      </button>
    </div>
  );
}
