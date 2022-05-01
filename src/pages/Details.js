import React, { Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/details.css";


function Details(){

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

            const token = "Barer " + localStorage.getItem("refresh_token"); 
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Calendário</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>

                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>
                            </li>                                
                        </ul>
                        <div className="form-inline my-2 my-md-0">
                            <a className="nav-link twhite" href="/login">Login</a>
                            <a className="nav-link twhite" onClick={ handleDeslog }href="/login">Deslogar</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="page-wrapper">
                <div className="wrapper wrapper--w900">
                    <div className="card card-6">
                        <div className="card-body">
                            <form method="POST" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="name">Título</div>
                                    <div className="value">
                                        <input className="input--style-6" type="text" name="full_name" onChange={(e) => setTitulo(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="name">Descrição</div>
                                    <div className="value">
                                        <div className="input-group">
                                            <textarea className="textarea--style-6" name="message" placeholder="" onChange={(e) => setDescricao(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="name">Tipo de Banca</div>
                                    <div className="value">
                                    <select className="input--style-6 form-control" onChange={(e) => setTipoBanca(e.target.value)}>
                                        <option value="TCC_CURSO_TECNICO">TCC Curso Técnico</option>
                                        <option value="TCC_CURSO_SUPERIOR">TCC Curso Superior</option>
                                        <option value="MONOGRAFIA_SUPERIOR">Monografia Curso</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="name">Tema</div>
                                    <div className="value">
                                        <input className="input--style-6" type="text" name="full_name" onChange={(e) => setTema(e.target.value)}/>
                                    </div>
                                </div> 
                                <div className="form-row">
                                <div className="name">Data de Agendamento</div>
                                <div className="value form-outline">
                                    <input placeholder='' type="date" id="" className="input--style-6 form-control" onChange={(e) => setDataAgendamento(e.target.value)}/>
                                </div>
                                </div>
                                <div className="form-row">
                                <div className="name">Data de Cadastro</div>
                                <div className="value form-outline">
                                    <input placeholder='' type="date" id="" className="input--style-6 form-control" onChange={(e) => setDataCadastro(e.target.value)}/>
                                </div>
                                </div>
                                <div className="form-row">
                                    <div className="name">Participantes</div>
                                    <div className="value">
                                    <select className="input-group form-control" onChange={(e) => setListaIdParticipantes(e.target.value)}>
                                        <option value="1">Participantes</option>
                                        <option value="2">teste2</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="name">Avaliadores</div>
                                    <div className="value">
                                    <select className="input-group form-control" onChange={(e) => setListaIdAvaliadores(e.target.value)}>
                                        <option value="1">Avaliadores</option>
                                        <option value="2">Testes</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                <div className="name">Status Agendamento</div>
                                <div className="value">
                                    <select className="input-group form-control" onChange={(e) => setStatusAgendamento(e.target.value)}>
                                        <option value="AGENDADO">Agendado</option>
                                        <option value="AGUARDANDO">Aguardando</option>
                                        <option value="CANCELADO">Cancelado</option>
                                    </select>
                                </div>
                            </div>
                                {/*<div className="form-row">
                                    <div className="name">Upload CV</div>
                                    <div className="value">
                                        <div className="input-group js-input-file">
                                            <input className="input-file" type="file" name="file_cv" id="file"/>
                                            <label className="label--file" for="file">Choose file</label>
                                            <span className="input-file__info">No file chosen</span>
                                        </div>
                                        <div className="label--desc">Upload your CV/Resume or any other relevant file. Max file size 50 MB</div>
                                    </div>
                                </div>*/}
                                <div className="card-footer">
                                <button className="btn btn--radius-2 btn--blue-2">Salvar</button>
                                {/* onClick={event =>  window.location.href='./boards'} */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Details;