import { useContext } from "react";
import { ContextGame } from "../../../CONTEXTS";
//authcontext
import { useAuth } from "../../../firebase/AuthContext";
import Opponent from "./Opponent";
import king_white from "../../../images/patudo/king-white.png";
import king_black from "../../../images/patudo/king-black.png";
import king_white_no_crown from "../../../images/patudo/king-white-no-crown.png";
import king_crown from "../../../images/patudo/king-crown.png";

export default function TableArea() {
  const { gameState } = useContext(ContextGame);
  const { currentUser } = useAuth();
  // const [oppArray, setOppArray] = useState([]);

  const uid = currentUser.uid;

  const players = gameState.players;
  const playerPos = players.findIndex((player) => player.uid === uid);
  const oppsAfter = players.slice(playerPos + 1);
  const oppsBefore = players.slice(0, playerPos);
  const oppArray = oppsAfter.concat(oppsBefore);



  return (
    <div className="table-area-holder flex-column">
      <div className={`table-area flex-row`}>
      {/* loader - also in other game areas!!! */}
        {gameState.isOver === null ? (
          <></>
          //if game is over show winner
        ) : gameState.isOver && gameState.players[0].uid === uid ? (
          <>
            <img src={king_crown} alt="crown" className="winner-crown"></img>
            <img
              src={king_white_no_crown}
              alt="winner"
              className="winner-king"
            />
          </>
          //if player is out of game
        ) : !gameState.players.some((player) => player.uid === uid) ? (
          gameState.players.map((player, index) => (
            <Opponent
              key={player.uid}
              props={{
                player,
                isCurrent:
                  gameState.players[gameState.currentPlayer]?.uid ===
                  player.uid,
                isOver: gameState.isOver,
              }}
            />
          ))
          //normal
        ) : (
          oppArray.map((player, index) => (
            <Opponent
              key={player.uid}
              props={{
                player,
                isCurrent:
                  gameState.players[gameState.currentPlayer]?.uid ===
                  player.uid,
                isOver: gameState.isOver,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
