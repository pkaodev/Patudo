import Login from "./Login";
import Register from "./Register";

/**
 * !!!:
 * add error messages to user
 * -hover over? -popup? to show password requirements
 */



export default function PAGE_LoginRegister() {
  return (
    <section className="page-login-register centre-single-item take-up-whole-space">
      <div className="flex-column login-register-holder">
        <div className="flex-column">
          <Login />
          <Register />
        </div>
      </div>
    </section>
  );
}
