import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/boards.css";

function ConfirmBanca() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");

  const handleConfirmBanca = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/auth/activateUser",
        {
          email,
          activationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(`Erro ao confirmar o cadastro: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="appForm mt-5">
        <h1 className="center formFieldEC">CONFIRMAR PARTICIPAÇÃO</h1>
        <div className="formCenter">
          <form className="formFields" method="POST" onSubmit={handleConfirmBanca}>
            <div className="formField">
              <label className="center formFieldLabel">
                Clique em "ACEITAR" para concordar em participar da banca NOMEDABANCA
              </label>
            </div>
            <div className="formFieldEC">
              <button type="submit" className="btn btn-block btn-primary">
                Aceitar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBanca;
