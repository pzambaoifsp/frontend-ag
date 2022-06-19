import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "../style/signform.css";

export function Home() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/confirm");
  };

  return (
    <div>
      <div className="appForm">
        <button type="button" onClick={handleGoToLogin}>
          Realizar login
        </button>
      </div>
    </div>
  );
}

export default Home;
