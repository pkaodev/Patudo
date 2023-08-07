import { apiPUTMove } from "../../../firebase/firebaseFunctionsFE";
import { useState, useContext } from "react";
import { ContextGame } from "../../../CONTEXTS";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../firebase/AuthContext";

export default function BS({isValid}) {
  const { gameState } = useContext(ContextGame);
  const { gameCode } = useParams();
  const { currentUser } = useAuth();

  return (
    <div className="bs-holder flex-column">
      <button
        onClick={(e) => {
          apiPUTMove(e, currentUser, gameCode, {
            moveNumber: gameState.moveNumber + 1,
            moveType: "bs",
          });
        }}
        disabled={!isValid}
        className={`${!isValid ? "faded-text" : ""}`}
      >
        BS
      </button>
    </div>
  );
}
