import React, { Component, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/details.css";
import Select from 'react-select';
import getTokenOrEmptyToken from "../utils/TokenUtils";
import FilterMembers from "../utils/FilterMembers";
import AgendamentoDataSource from "../dataSource/AgendamentoDataSource";
import UsersDataSource from "../dataSource/UsersDataSource";
import Values from "../utils/Values";
import {TextField} from "@mui/material";

// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";

function Details() {

  const status = Values.status

  const optionsBanca = Values.optionsBanca

  const navigate = useNavigate();

  const handleDeslog = async (event) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    Navigate("/login");
  };


  const [membersAlunos, setMembersAlunos] = useState([]);
  const [membersProfessores, setMembersProfessores] = useState([]);
  const [membersAdms, setMembersAdms] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaIdParticipantes, setListaIdParticipantes] = useState("");
  const [listaIdAvaliadores, setListaIdAvaliadores] = useState("");
  const [statusAgendamento, setStatusAgendamento] = useState("");
  const [adminsBanca, setAdminsBanca] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = getTokenOrEmptyToken()
    UsersDataSource.getUsers(token).then(res =>
      setUsers(res.data.data)
    );

  }, [])

  useEffect(() => {
    FilterMembers.membersAlunos(users).forEach(user => {
      console.log(user)
      const value = { value: user.id, label: user.username }
      setMembersAlunos(oldArray => [...oldArray, value]);
    })

    FilterMembers.membersProfessores(users).forEach(user => {
      const value = { value: user.id, label: user.username }
      setMembersProfessores(oldArray => [...oldArray, value]);
      setMembersAdms(oldArray => [...oldArray, value]);
    })
  }, [users])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getTokenOrEmptyToken()
      console.log(token);
      console.log(listaIdParticipantes)

      const response = AgendamentoDataSource.addAgendamento(
        titulo,
        descricao,
        tipoBanca,
        tema,
        dataAgendamento,
        [parseInt(listaIdParticipantes)],
        [parseInt(listaIdAvaliadores)],
        statusAgendamento,
        [parseInt(listaIdAvaliadores)]
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
                      onChange={(data) => setTipoBanca(data.value)}
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField className="input--style-6 form-control "{...props} />}
                        label="Data de agendamento"
                        value={dataAgendamento}
                        onChange={(newValue) => {
                          setDataAgendamento(newValue.toISOString().replace('T', ' ').substring(0, 16));
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Participantes</div>
                  <div className="value">
                    <Select
                      options={membersAlunos}
                      //defaultValue={}
                      // value={listaIdParticipantes}
                      onChange={(data) => setListaIdParticipantes(
                        data.map(user => user.value
                        ))}
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Avaliadores</div>
                  <div className="value">
                    <Select
                      options={membersProfessores}
                      //defaultValue={}
                      // value={listaIdAvaliadores}
                      onChange={(data) => setListaIdAvaliadores(data.map(user => user.value))}
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Status Agendamento</div>
                  <div className="value">
                    <Select
                      options={status}
                      //defaultValue={}
                      //value={statusAgendamento}
                      onChange={(data) => setStatusAgendamento(data.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Administradores da Banca</div>
                  <div className="value">
                    <Select
                      options={membersAdms}
                      // value={adminsBanca}
                      onChange={(data) => setAdminsBanca(data.map(user => user.value))}
                      isMulti
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn--radius-2 btn--blue-2"
                  >
                    Salvar
                  </button>
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
