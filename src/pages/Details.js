import React, { Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/details.css";
import Select from 'react-select';

function Details() {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const optionsAg = [
    { value: 'AGENDADO', label: 'Agendado' },
    { value: 'AGUARDANDO', label: 'Aguardando' },
    { value: 'CANCELADO', label: 'Cancelado' }
  ]

  const optionsBanca = [
    { value: 'TCC_CURSO_TECNICO', label: 'TCC Curso Técnico' },
    { value: 'TCC_CURSO_SUPERIOR', label: 'TCC Curso Superior' },
    { value: 'MONOGRAFIA_SUPERIOR', label: 'Monografia Superior' }
  ]

  const optionsAdm = [
    { value: 'TCC_CURSO_TECNICO', label: 'TCC Curso Técnico' },
    { value: 'TCC_CURSO_SUPERIOR', label: 'TCC Curso Superior' },
    { value: 'MONOGRAFIA_SUPERIOR', label: 'Monografia Superior' }
  ]

  const navigate = useNavigate();

  const handleDeslog = async (event) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    Navigate("/login");
  };

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaIdParticipantes, setListaIdParticipantes] = useState("");
  const [listaIdAvaliadores, setListaIdAvaliadores] = useState("");
  const [statusAgendamento, setStatusAgendamento] = useState("");
  const [adminsBanca, setAdminsBanca] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = "Bearer " + localStorage.getItem("access_token");
      console.log(token);

      const response = await api.post(
        "/agendamentos",
        {
          titulo,
          descricao,
          tipoBanca,
          tema,
          dataAgendamento: "2023-04-30 18:30",
          listaIdParticipantes: [parseInt(listaIdParticipantes)],
          listaIdAvaliadores: [parseInt(listaIdAvaliadores)],
          statusAgendamento,
          adminsBanca: [parseInt(listaIdAvaliadores)]
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/boards");
    } catch (error) {
      console.log(`Erro ao realizar login: ${error.message}`);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Calendário
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample07"
            aria-controls="navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            <div className="form-inline my-2 my-md-0">
              <a className="nav-link twhite" href="/login">
                Login
              </a>
              <a
                className="nav-link twhite"
                onClick={handleDeslog}
                href="/login"
              >
                Deslogar
              </a>
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
                    <input
                      className="input--style-6"
                      type="text"
                      name="full_name"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Descrição</div>
                  <div className="value">
                    <div className="input-group">
                      <textarea
                        className="textarea--style-6"
                        name="message"
                        placeholder=""
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Tipo de Banca</div>
                  <div className="value">
                    <Select
                      options={optionsBanca}
                      //defaultValue={}
                      // value={tipoBanca}
                      // onChange={(e) => setTipoBanca(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Tema</div>
                  <div className="value">
                    <input
                      className="input--style-6"
                      type="text"
                      name="full_name"
                      value={tema}
                      onChange={(e) => setTema(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Data de Agendamento</div>
                  <div className="value form-outline">
                    <input
                      placeholder=""
                      type="text"
                      id=""
                      className="input--style-6 form-control"
                      value={dataAgendamento}
                      onChange={(e) => setDataAgendamento(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Participantes</div>
                  <div className="value">
                    <Select
                      options={options}
                      //defaultValue={}
                      // value={listaIdParticipantes}
                      // onChange={(e) => setListaIdParticipantes(e.target.value)}
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Avaliadores</div>
                  <div className="value">    
                    <Select
                      options={options}
                      //defaultValue={}
                      // value={listaIdAvaliadores}
                      // onChange={(e) => setListaIdAvaliadores(e.target.value)}
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Status Agendamento</div>
                  <div className="value">
                    <Select
                      options={optionsAg}
                      //defaultValue={}
                      // value={statusAgendamento}
                      // onChange={(e) => setStatusAgendamento(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Administradores da Banca</div>
                  <div className="value">
                    <Select
                      options={optionsAdm}                      
                      // value={adminsBanca}
                      // onChange={(e) => setAdminsBanca(e.target.value)}
                      isMulti
                    />
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
                  <button
                    type="submit"
                    className="btn btn--radius-2 btn--blue-2"
                  >
                    Salvar
                  </button>
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
