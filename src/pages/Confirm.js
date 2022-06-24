import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/boards.css";

function Confirm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");

  var confirm_email = localStorage.getItem("email_confirmation")

  useEffect(() => {
    if (!confirm_email){
     navigate("/login")   
    }
  },[])

  const handleConfirmAccount = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/auth/activateUser",
        {
          email: confirm_email,
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
      <div className="appForm">
        <h1 className="center formFieldEC">CONFIRME SEU CADASTRO</h1>
        <div className="formCenter">
          <form className="formFields" method="POST" onSubmit={handleConfirmAccount}>
            <div className="formFieldEC">
              <label className="formFieldLabel">
                Digite neste campo o código de validação enviado no email
                informado durante o cadastro.
              </label>
              <input
                type="text"
                className="formFieldEmailConfirm"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                placeholder="Digite o código de validação"
              />
            </div>

            <div className="formFieldEC">
              <span>
                Não recebeu nenhum email? Reenviar email de confirmação
              </span>
            </div>

            <div className="formFieldEC">
              <button type="submit" className="btn btn-block btn-primary">
                Acessar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
