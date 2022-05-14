import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../style/boards.css";

function Confirm() {

    const Navigate = useNavigate();


    const handleGoToBoards = async (event) => {

        Navigate("/boards");
    }

    return ( 
        <div>
            <div className="appForm">
                <h1 className="center formFieldEC">CONFIRME SEU CADASTRO</h1>
                <div className="formCenter">
                 {/* <form className="formFields" method="POST" onSubmit={handleGoToBoards}> */}
                    <div className="formFieldEC">
                        <label className="formFieldLabel" >
                        Digite neste campo o código de validação enviado no email informado durante o cadastro.
                        </label>
                        <input
                        type="text"
                        className="formFieldEmailConfirm"
                        placeholder="Digite o código de validação"
                        />
                    </div>
            
                    <div className="formFieldEC">
                        <span>Não recebeu nenhum email? Reenviar email de confirmação</span>
                    </div>
            
                    <div className="formFieldEC">
                        <button type="button" className="btn btn-block btn-primary" onClick={handleGoToBoards}>Acessar</button>
                    </div>
            
                    {/* </form> */}
                </div>
            </div>
        </div>

        );
    }


export default Confirm;