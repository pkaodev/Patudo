import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";
import { useState } from "react";


//button only shows when not logged in
//navigates to '/' when clicked

export default function SignoutButton({setPopup}) {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleSignout() {
        setError("");
        try {
          await logout();
          navigate("/home");
          setPopup(false)
        } catch {
          setError("Failed to logout");
        }
      }

  return (
    <>
        {currentUser && <button className="" onClick={handleSignout}>Sign out</button>}
    </>
  )
}
