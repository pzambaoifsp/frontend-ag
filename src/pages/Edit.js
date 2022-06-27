import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AgendamentoDataSource from "../dataSource/AgendamentoDataSource";
import api from "../services/api";
import "../style/details.css";
import TokenUtils from "../utils/TokenUtils";
import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select from 'react-select';
import Values from "../utils/Values";
import UsersDataSource from "../dataSource/UsersDataSource";
import FilterMembers from "../utils/FilterMembers";
import { toast } from "react-toastify";
import Header from "../components/Header/Header";

function Edit() {
  const router = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState();

  const optionsStatus = Values.status
  const optionsBanca = Values.optionsBanca

  const [optionsAlunos, setOptionsAlunos] = useState([]);
  const [optionsProfessores, setOptionsProfessores] = useState([]);
  const [optionsAdms, setOptionsAdms] = useState([]);
  const [listaIdAdms, setListaIdAdms] = useState([])
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaIdParticipantes, setListaIdParticipantes] = useState("");
  const [listaIdAvaliadores, setListaIdAvaliadores] = useState("");
  const [listaParticipantes, setListaParticipantes] = useState([]);
  const [listaAvaliadores, setListaAvaliadores] = useState([]);
  const [statusAgendamento, setStatusAgendamento] = useState("");
  const [listaAdmins, setListaAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [valueAlunos, setValueAlunos] = useState([]);
  const [valueProfessores, setValueProfessores] = useState([]);
  const [valueAdmins, setValueAdmins] = useState([]);
  const [valueStatus, setValueStatus] = useState();
  const [valueTipoBanca, setValueTipoBanca] = useState();

  useEffect(() => {
    const { id } = router;
    setId(id);

    const token = TokenUtils.getTokenOrEmptyToken();

    AgendamentoDataSource.getAgendamentoById(token, id)
      .then((response) => {
        setInfoOnConstants(response.data.data)
      });

    UsersDataSource.getUsers(token).then(res =>
      setUsers(res.data.data)
    );
  }, []);

  useEffect(() => {
    FilterMembers.membersAlunos(users).forEach(user => {

      const value = { value: user.id, label: user.username }
      setOptionsAlunos(old => [...old, value]);

    });
    FilterMembers.membersProfessores(users).forEach(user => {
      const value = { value: user.id, label: user.username }

      setOptionsProfessores(old => [...old, value]);
      setOptionsAdms(old => [...old, value]);
    })
  }, [users])

  useEffect(() => {
    const listaIdParticipantesUseEffect = listaParticipantes.map(participante => participante.id)
    const participantesQueExisteNoOptionsAlunos = optionsAlunos.filter(option => listaIdParticipantesUseEffect.indexOf(option.value) != -1)
    setValueAlunos(participantesQueExisteNoOptionsAlunos)
    setListaIdParticipantes(participantesQueExisteNoOptionsAlunos.map(option => option.value))
  }, [listaParticipantes, optionsAlunos])

  useEffect(() => {
    const listaIdAvaliadoresUseEffect = listaAvaliadores.map(avaliador => avaliador.id)
    const participantesQueExisteNoOptionsProfessores = optionsProfessores.filter(option => listaIdAvaliadoresUseEffect.indexOf(option.value) != -1)
    setValueProfessores(participantesQueExisteNoOptionsProfessores)
    setListaIdAvaliadores(participantesQueExisteNoOptionsProfessores.map(option => option.value))
  }, [listaAvaliadores, optionsProfessores])

  useEffect(() => {
    const listaIdAdminsUseEffect = (listaAdmins) ? listaAdmins.map(admin => admin.id) : []
    const adminsQueExisteNoOptionsAdmins = optionsAdms.filter(option => listaIdAdminsUseEffect.indexOf(option.value) != -1)
    setValueAdmins(adminsQueExisteNoOptionsAdmins)
    setListaIdAdms(adminsQueExisteNoOptionsAdmins.map(option => option.value))
  }, [listaAdmins, optionsAdms])

  useEffect(() => {
    const statusSelected = optionsStatus.filter(option => option.value === statusAgendamento)
    setValueStatus(statusSelected)
  }, [statusAgendamento])

  useEffect(() => {
    const tipoBancaSelected = optionsBanca.filter(option => option.value === tipoBanca)
    setValueTipoBanca(tipoBancaSelected)
  }, [tipoBanca])

  function setInfoOnConstants(data) {
    setTitulo(data.titulo);
    setDescricao(data.descricao);
    setTipoBanca(data.tipoBanca);
    setTema(data.tema);
    setDataAgendamento(data.dataAgendamento.replace("T", " "));
    setListaParticipantes(data.listaParticipantes);
    setListaAvaliadores(data.listaAvaliadores);
    setListaAdmins(data.listaAdmins)
    setStatusAgendamento(data.statusAgendamento);
  }

  function validateAndSetDateAgendamento(stringDate) {
    try {
      const newDate = stringDate.toISOString().replace('T', ' ').substring(0, 16)
      setDataAgendamento(newDate)
    } catch (exception) {
      document.getElementById('input-dtp-dataAgendamento')
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AgendamentoDataSource.updateAgendamento(
        id,
        titulo,
        descricao,
        tipoBanca,
        tema,
        dataAgendamento,
        listaIdParticipantes,
        listaIdAvaliadores,
        statusAgendamento,
        listaIdAdms,
        (listaAdmins) ? listaAdmins.map(admin => admin.id) : []
      )

      response.then(
        navigate("/boards")
      )

    } catch (error) {
      const message = error.response.data.mensagem
      toast.error(message)
    }
  };

  return (
    <div>
      <Header name={"Calendário de Bancas"}></Header>

      <div className="page-wrapper">
        <div className="wrapper wrapper--w900">
          <div className="card card-6">
            <div className="card-body">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="name">Título</div>
                  <div className="value">
                    <TextField required label="Título da banca"
                      fullWidth
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Tema</div>
                  <div className="value">
                    <TextField required label="Tema da banca"
                      fullWidth
                      variant="outlined"
                      type="text"
                      value={tema}
                      onChange={(e) => setTema(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Descrição</div>
                  <div className="value">
                    <TextField
                      label="Descrição da banca"
                      multiline
                      fullWidth
                      rows={4}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Data de Agendamento</div>
                  <div className="value">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        id="input-dtp-dataAgendamento"
                        renderInput={(props) => <TextField fullWidth className="input--style-6 "{...props} />}
                        label="Data de agendamento"
                        value={dataAgendamento.replace(" ", "T")}
                        inputFormat="dd/MM/yyyy hh:mm a"

                        onChange={(newValue) => {
                          validateAndSetDateAgendamento(newValue)
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Tipo de Banca</div>
                  <div className="value">
                    <Select
                      options={optionsBanca}
                      value={valueTipoBanca}
                      placeholder="Selecione um tipo da banca"
                      onChange={(data) => setTipoBanca(data.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Participantes</div>
                  <div className="value">
                    <Select
                      placeholder="Participantes da banca"
                      options={optionsAlunos}
                      value={valueAlunos}
                      onChange={(data) => {
                        setValueAlunos(data)
                        setListaIdParticipantes(data.map(user => user.value))
                      }
                      }
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Avaliadores</div>
                  <div className="value">
                    <Select
                      options={optionsProfessores}
                      value={valueProfessores}
                      placeholder="Avaliadores da bancas"
                      onChange={(data) => {
                        setValueProfessores(data)
                        setListaIdAvaliadores(data.map(user => user.value))
                      }}
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Status da Banca</div>
                  <div className="value">
                    <Select
                      isDisabled={true}
                      options={optionsStatus}
                      value={valueStatus}
                      //defaultValue={}
                      //value={statusAgendamento}
                      placeholder="Status da banca"
                      onChange={(data) => setStatusAgendamento(data.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Administradores da Banca</div>
                  <div className="value">
                    <Select
                      options={optionsAdms}
                      value={valueAdmins}
                      placeholder="Admins da banca"
                      onChange={(data) => {
                        setValueAdmins(data)
                        setListaIdAdms(data.map(user => user.value))
                      }}
                      isMulti
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn--radius-2 btn--blue-2 float-right mb-5"
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

export default Edit;
