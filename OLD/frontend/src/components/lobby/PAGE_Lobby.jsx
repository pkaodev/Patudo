import PrivateRoute from "../authentication/PrivateRoute";
import PlayerList from "./PlayerList";
import StartGameButton from "./StartGameButton";
import { useState, useEffect } from "react";
import { autoSubscribeToLobby } from "../../firebase/firebaseFunctionsFE";
import { useParams } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";
import { useNavigate } from "react-router-dom";

const lobbyObjSHAPE = {
  lobbyCode: "",
  createdAt: new Date(0),
    admin: "",
    players: [],
    gameHasStarted: false
  }
  
export default function PAGE_Lobby() {

  const navigate = useNavigate()
  const { currentUser } = useAuth();
  const { lobbyCode } = useParams();
  const [lobbyState, setLobbyState] = useState(lobbyObjSHAPE);
  
  //!!!use this instead of below when bug is fixed
  // useEffect(() => {
  //   autoSubscribeToLobby(lobbyCode, currentUser.uid, setLobbyState)
  // }, []);

  //!!!TEMPORARY HACKY FIX - THIS WILL BE REMOVED SOON!!!
  //if game hasn't been played for a while the host doesn't see updated player list
  //will be resolved when lobby/game creation is moved to API
  useEffect(() => {
    const interval = setInterval(() => {
      autoSubscribeToLobby(lobbyCode, currentUser.uid, setLobbyState)
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  //navigate to /game/:gameCode when game has started
  useEffect(() => {
    if (lobbyState.gameHasStarted) {
      navigate(`/Patudo-v0/game/${lobbyCode}`);
    }
  }, [lobbyState.gameHasStarted]);
  

  return (
    <PrivateRoute>
      <section className="page-lobby take-up-whole-space centre-single-item flex-column">
        <div className='lobby-holder flex-column'>
        <br />
        <p className="padding-m">Lobby code: <u>{lobbyCode}</u></p>
        <br />
        <br />
        <p className="padding-m">Players:</p>
        <br />
        {
          <PlayerList players={lobbyState.players} admin={lobbyState.admin} />
        }
        <br />
        <br />
        {currentUser.uid === lobbyState.admin && <StartGameButton props={{lobbyState, lobbyCode}} />}
        <br />
        </div>
      </section>
    </PrivateRoute>
  );
}
