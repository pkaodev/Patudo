import { handleJoinLobby } from "../../firebase/firebaseFunctionsFE";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";

export default function JoinLobby({nickname}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [ lobbyCode, setLobbyCode ] = useState('');
  // const { findGameObj, setFindGameObj } = useContext(ContextFindGame);

  const handleLobbyCodeChange = (e) => {
    const validChars = /^[a-zA-Z0-9]*$/;
    if (validChars.test(e.target.value)) {
      setLobbyCode(e.target.value.toUpperCase());
    }
  };
  return (
    <div className="flex-column join-lobby-holder">
      <input
        id="join-lobby__input input-one"
        className="join-lobby__input"
        type="text"
        maxLength={4}
        value={lobbyCode}
        onChange={(e) => handleLobbyCodeChange(e)}
      />
      <button className="btn-one" onClick={(e)=> {
        handleJoinLobby(e, lobbyCode, currentUser.uid, nickname, navigate)
      }}>Join lobby</button>
    </div>
  );
}
