import { Navigate } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";

/**
 * call this for routes that you want only logged in users to see, ie:
 * <PrivateRoute>
 *   <SomeComponent />
 * </PrivateRoute>
 * will navigate to /login-register if not logged in
 */

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login-register" />;
}
