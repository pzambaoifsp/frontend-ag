import React, { Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../services/api";


function Detailsbackup(){

    const navigate = useNavigate();

    const handleDeslog = async (event) => {
     
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        Navigate("/login");
    }

    
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipoBanca, setTipoBanca] = useState("");
    const [tema, setTema] = useState("");
    const [dataAgendamento, setDataAgendamento] = useState("");
    const [dataCadastro, setDataCadastro] = useState("");
    const [listaIdParticipantes, setListaIdParticipantes] = useState("");
    const [listaIdAvaliadores, setListaIdAvaliadores] = useState("");
    const [statusAgendamento, setStatusAgendamento] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const params = new URLSearchParams();

        params.append("titulo", titulo);
        params.append("descricao", descricao);
        params.append("tipoBanca", tipoBanca);
        params.append("tema", tema);
        params.append("dataAgendamento", dataAgendamento);
        params.append("dataCadastro", dataCadastro);
        params.append("listaIdParticipantes", listaIdParticipantes);
        params.append("listaIdAvaliadores", listaIdAvaliadores);
        params.append("statusAgendamento", statusAgendamento);

        
        try {

            const token = "Bearer " + localStorage.getItem("get_token"); 
            console.log(token)   

            const response = await api.post("/agendamentos", params, {
                method: 'POST',
                headers: new Headers({
                    Authorization: token,
                }),
            });

            navigate("/boards")
        
        } catch(error) {
        console.log(`Erro ao realizar login: ${error.message}`);
        }
    }

    return ( 
        <div>

            <div className="contact-info-section margin-40px-tb">
              <ul className="list-style9 no-margin">
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-graduation-cap" />
                      <strong className="margin-10px-left">
                        Descrição:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>Master's Degrees</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-graduation-cap" />
                      <strong className="margin-10px-left">
                        Tipo de banca:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>Master's Degrees</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fa-solid fa-clipboard-list" />
                      <strong className="margin-10px-left">
                        Tema:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>4 Year in Education</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="far fa-calendar-alt" />
                      <strong className="margin-10px-left">
                        Data da apresentação:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>Design Category</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fa-solid fa-users" />
                      <strong className="margin-10px-left">
                        Participantes:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>Regina ST, London, SK.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fa-solid fa-people-group" />
                      <strong className="margin-10px-left xs-margin-four-left">
                        Avaliadores:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>(+44) 123 456 789</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-clipboard-user" />
                      <strong className="margin-10px-left xs-margin-four-left">
                        Administradores:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>
                        <a href="javascript:void(0)">addyour@emailhere</a>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-graduation-cap" />
                      <strong className="margin-10px-left">
                        Status:
                      </strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p>Master's Degrees</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          
        </div>
    );
}



export default Detailsbackup;