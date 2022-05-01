import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; 
import AuthContext from "../../contexts/auth";

export default function ProtectedRoute({ component: Component, redirect }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    try {
      if (accessToken !== '' && accessToken !== null) {
        const decoded = jwt_decode(accessToken);
        setUser(decoded);
        setAuthenticated(true);
        setChecked(true);
      } else {
        setChecked(true);
        setAuthenticated(false);
      }
    } catch (error) {
      setChecked(true);
      setAuthenticated(false);
      console.log("Token Inválido");
    }
  }, []);

  return (
    <>
      {checked &&
        (authenticated ? (
          <AuthContext.Provider value={user}>
            <Component />
          </AuthContext.Provider>
        ) : (
          <Navigate to={redirect} />
        ))}
    </>
  );
}