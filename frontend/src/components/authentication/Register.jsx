import { useRef, useState } from "react";
import { useAuth } from "../../firebase/AuthContext";
import { Link, useNavigate } from "react-router-dom";


//!!!RENDER ERROR MESSAGE
export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/Patudo-v0/find-game");
    } catch (err) {
      //err.code === "auth/email-already-in-use"
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
      setError("Failed to create an account");
      }
    }

    setLoading(false);
  }

  return (
    <div className="register-holder flex-column">
      <p className='padding-l'>Sign Up</p>
      {error && <p className="login-register-error">{error}</p>}
      <form className="flex-column" id="register-form" onSubmit={handleSubmit}>
        <p className="padding-s">email</p>
        <input type="email" id="register-email" ref={emailRef} required />
        <p className="padding-s">password</p>
        <input
          type="password"
          id="register-password1"
          ref={passwordRef}
          required
        />
        <p className="padding-s">repeat password</p>
        <input
          type="password"
          id="register-password2"
          ref={passwordConfirmRef}
          required
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
