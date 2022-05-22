import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/boards.css";

function Confirm() {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [activationCode, setActivationCode] = useState("");

    const handleConfirmAccount = async (event) => {
        event.preventDefault();

        try{
            const response = await api.post("/auth/activateUser", {
                id,
                activationCode
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            navigate("/login")
        } catch(error) {
            console.log(`Erro ao confirmar o cadastro: ${error.message}`);
        }
    }

    return ( 
        <div>
            <div className="appForm">
                <h1 className="center formFieldEC">CONFIRME SEU CADASTRO</h1>
                <div className="formCenter">
                    <form className="formFields" method="POST" onSubmit={handleConfirmAccount}>
                        <div className="formFieldEC">
                            <label className="formFieldLabel" >
                            Digite o ID de cadastro
                            </label>
                            <input
                                type="number"
                                id="id"
                                className="formFieldEmailConfirm"
                                name="id"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="Digite o ID"
                            />
                        </div>

                        <div className="formFieldEC">
                            <label className="formFieldLabel" >
                            Digite neste campo o código de validação enviado no email informado durante o cadastro.
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
                            <span>Não recebeu nenhum email? Reenviar email de confirmação</span>
                        </div>
                
                        <div className="formFieldEC">
                            <button type="submit" className="btn btn-block btn-primary">Acessar</button>
                        </div>
            
                    </form>
                </div>
            </div>
        </div>

        );
    }


export default Confirm;