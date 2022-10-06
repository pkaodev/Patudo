import { useAuth } from "../../firebase/AuthContext";
import SignoutButton from "../authentication/SignoutButton";
import { Link } from "react-router-dom";
//import useNavigate
import { useNavigate } from "react-router-dom";

export default function SignInOut({setPopup}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div>
      {currentUser ? (
        <SignoutButton setPopup={setPopup} />
      ) : (
        <button className="btn-one"
          onClick={() => {
            navigate("/login-register");
            setPopup(false)
          }}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
