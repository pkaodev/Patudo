import React, { useRef, useState } from "react";
import { useAuth } from "../../firebase/AuthContext";
import { Link, useNavigate } from "react-router-dom";

//!!!RENDER ERROR MESSAGE
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  //ERROR?
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/Patudo-v0/find-game");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className="login-holder flex-column">
      <p className='padding-l'>Log In</p>
      <form className="flex-column" id="login-form" onSubmit={handleSubmit}>
      <p className="padding-s">email</p>
        <input type="email" id="login-email" ref={emailRef} required />
        <p className="padding-s">password</p>
        <input type="password" id="login-password" ref={passwordRef} required />
        <button disabled={loading} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
