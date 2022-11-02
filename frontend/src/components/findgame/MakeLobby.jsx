import { handleMakeLobby } from "../../firebase/firebaseFunctionsFE";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";


/**
 * !!!check name length/exists already
 */


export default function MakeLobby({nickname}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className="flex-column make-lobby-holder">
      <button
        id="make-lobby__button"
        className="create-lobby-btn"
        onClick={(e) => {
          handleMakeLobby(e, currentUser.uid, nickname, navigate);
        }}
      >
        Create lobby
      </button>
    </div>
  );
}
