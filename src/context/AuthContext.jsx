import { createContext, useState } from "react";

export const AuthContext = createContext();

/**
 * Decode a JWT without any external library.
 * Returns the payload object, or null if the token is invalid/missing.
 */
const decodeJwt = (jwt) => {
  try {
    if (!jwt) return null;
    const base64Payload = jwt.split(".")[1];
    // Replace URL-safe chars and pad to multiple of 4
    const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Decode once on initialisation (covers page refresh)
  const [user, setUser] = useState(() =>
    decodeJwt(localStorage.getItem("token")),
  );

  const loginUser = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setUser(decodeJwt(jwt)); // populate user immediately on login
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
