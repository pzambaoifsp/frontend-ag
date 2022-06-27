import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import AgendamentoDataSource from "../../dataSource/AgendamentoDataSource";
import "../../style/details.css";
import TokenUtils from "../../utils/TokenUtils";
import InfoMembroNaBanca from "../../components/details/InfoMembroNaBanca";
import "../../style/detailsbyid.css";
import formatDate from "../../utils/FormatDate";
import ButtonChangeBancaPersonalStatus from "../../components/ChangeBancaAccountStatus/ChangeBancaAccountStatus";
import { toast } from "react-toastify";
import api from "../../services/api";


function BancaDetailsById() {
  const router = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState();
  const [linkToAcceptBanca, setLinkToAcceptBanca] = useState("");
  const [linkToDeclineBanca, setLinkToDeclineBanca] = useState("");

  const [htmlListaAvaliadores, setHtmlListaAvaliadores] = useState("");
  const [htmlListaParticipantes, setHtmlListaParticipantes] = useState("");
  const [htmlListaAdministradores, setHtmlListaAdministradores] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaParticipantes, setListaParticipantes] = useState([]);
  const [listaAvaliadores, setListaAvaliadores] = useState([]);
  const [statusAgendamento, setStatusAgendamento] = useState("");
  const [adminsBanca, setAdminsBanca] = useState([]);
  const [enableToEdit, setEnableToEdit] = useState(false);
  const [usuarioParticipaDessaBanca, setUsuarioParticipaDessaBanca] = useState(false)
  const [usuarioConfirmaStatus, setUsuarioConfirmaStatus] = useState(false)
  const [usuarioStatusAtualNaBanca, setUsuarioStatusAtualNaBanca] = useState("")

  useEffect(() => {
    const { id } = router;
    setId(id);

    const token = TokenUtils.getTokenOrEmptyToken();

    const response = AgendamentoDataSource.getAgendamentoById(token, id)
      .then((response) => {
        console.log(response)

        setTitulo(response.data.data.titulo);
        setDescricao(response.data.data.descricao);
        setTipoBanca(response.data.data.tipoBanca);
        setTema(response.data.data.tema);
        setDataAgendamento(
          formatDate(response.data.data.dataAgendamento)
        );
        setListaParticipantes(response.data.data.listaParticipantes);
        setListaAvaliadores(response.data.data.listaAvaliadores);
        setAdminsBanca(response.data.data.listaAdmins)
        setStatusAgendamento(response.data.data.statusAgendamento);
        setId(response.data.data.id)
      })
      .catch(error => toast.error(error.response.data.mensagem))
  }, []);

  useEffect(() => {
    listaAvaliadores.forEach(avaliador => {
      const divWithInfo =
        <InfoMembroNaBanca username={avaliador.username} prontuario={avaliador.prontuario} statusAgendamento={avaliador.statusAgendamento} />

      setHtmlListaAvaliadores(oldValues => [...oldValues, divWithInfo])
    })
  }, [listaAvaliadores])

  useEffect(() => {
    listaParticipantes.forEach(participante => {
      const divWithInfo =
        <InfoMembroNaBanca username={participante.username} prontuario={participante.prontuario} statusAgendamento={participante.statusAgendamento} />

      setHtmlListaParticipantes(oldValues => [...oldValues, divWithInfo])
    })
  }, [listaParticipantes])

  useEffect(() => {
    adminsBanca.forEach(administrador => {
      const divWithInfo =
        <InfoMembroNaBanca username={administrador.username} prontuario={administrador.prontuario} statusAgendamento={administrador.statusAgendamento} />

      setHtmlListaAdministradores(oldValues => [...oldValues, divWithInfo])
    })
  }, [adminsBanca])


  useEffect(() => {
    const canEdit = false;

    const token = TokenUtils.getTokenOrEmptyToken();
    const tokenDecoded = jwtDecode(token)
    //const isCurrentUserAdmin = adminsBanca.find(tokenDecoded.id)
    /*
    if (isCurrentUserAdmin || tokenDecoded.permission.find("ADMIN"))
      canEdit = true
    else
      
    canEdit = false
    */

    setEnableToEdit(true)
  }, [adminsBanca])

  useEffect(() => {
    var tokens = TokenUtils.informacoesDoToken(TokenUtils.getTokenOrEmptyToken());

    const listaComUsuariosNaBanca = [...listaAvaliadores, ...listaParticipantes]
    const bancaId = id;
    const usuarioNaBanca = listaComUsuariosNaBanca.filter(user => user.id == tokens.userId)[0];
    var status = "NAO_PARTICIPA"
    if (usuarioNaBanca) {
      status = usuarioNaBanca.statusAgendamento
      switch (usuarioNaBanca.statusAgendamento) {
        case "AGUARDANDO":
          status = "AGUARDANDO"; break;
        case "AGENDADO":
          status = "AGENDADO"; break;
        case "CANCELADO":
          status = "CANCELADO"; break;
      }
    }
    var tipoStatus = null;
    switch (status) {
      case "AGUARDANDO":
        tipoStatus = "confirmar"; break;
      case "AGENDADO":
        tipoStatus = "cancelar"; break;
      case "CANCELADO":
        tipoStatus = "confirmar"; break;
      default: tipoStatus = null; break;
    }

    setUsuarioStatusAtualNaBanca(status);

    if (tipoStatus) {
      const link = "agendamentos/" + "confirmar" + "?id=" + id + "&user=" + tokens.userId
      setLinkToAcceptBanca(link)
      const linkToRemove = "agendamentos/" + "cancelar" + "?id=" + id + "&user=" + tokens.userId
      setLinkToDeclineBanca(linkToRemove)
      
    }

    setUsuarioParticipaDessaBanca(status != "NAO_PARTICIPA")
    setUsuarioConfirmaStatus(tipoStatus == "AGUARDANDO")

  }, [id])
  function validate() {


  }

  function OnClickDecline() {
    const link = 
    api.post(linkToDeclineBanca, {}, {
      headers: {
        Authorization: TokenUtils.getTokenOrEmptyToken(),
      }
    }).then(res => {
      setUsuarioStatusAtualNaBanca("CANCELADO")
      toast.success("Status alterado para cancelado")
    }
    ).catch(err => toast.error(err.response.data.mensagem))
  }

  function onCLickAccept() {
    const link = 
    api.post(linkToAcceptBanca, {}, {
      headers: {
        Authorization: TokenUtils.getTokenOrEmptyToken(),
      }
    }).then(res =>{
      setUsuarioStatusAtualNaBanca("AGENDADO")
      toast.success(res.data.mensagem)
    }
      
    ).catch(err => toast.error(err.response.data.mensagem))
  }

  return (
    <div>
      <Header name={"Calendário de Bancas"}></Header>
      <div className="wrapper wapper--w900">
        <div className="container">
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th><font size='5' style={{ textTransform: 'uppercase' }}>{titulo}</font></th>
              </tr>
            </thead>
          </table>
          <div className="contact-info-section margin-60px-tb">
            <ul className="list-style9 no-margin">
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fa-solid fa-align-justify"></i>
                    <strong className="margin-10px-left ml-2">
                      Descrição:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{descricao}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fas fa-graduation-cap" />
                    <strong className="margin-10px-left ml-2">
                      Tipo de banca:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{tipoBanca}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fa-solid fa-clipboard-list" />
                    <strong className="margin-10px-left ml-2">
                      Tema:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{tema}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="far fa-calendar-alt" />
                    <strong className="margin-10px- ml-2">
                      Data da apresentação:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{dataAgendamento}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fa-solid fa-users" />
                    <strong className="margin-10px-left ml-2">
                      Participantes:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{htmlListaParticipantes}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fa-solid fa-people-group" />
                    <strong className="margin-10px-left xs-margin-four-left ml-2">
                      Avaliadores:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{htmlListaAvaliadores}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fas fa-clipboard-user" />
                    <strong className="margin-10px-left xs-margin-four-left ml-2">
                      Administradores:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>
                      <p>{htmlListaAdministradores}</p>
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fas fa-graduation-cap" />
                    <strong className="margin-10px-left ml-2">
                      Status da banca:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{statusAgendamento}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <i className="fas fa-child" />
                    <strong className="margin-10px-left ml-2">
                      Seus status na banca:
                    </strong>
                  </div>
                  <div className="col-md-6 col-6">
                    <p>{usuarioStatusAtualNaBanca}</p>
                  </div>
                </div>
              </li>
              <li>
                {(usuarioStatusAtualNaBanca!="AGENDADO") && (
                  <>
                  <ButtonChangeBancaPersonalStatus
                  enabled={usuarioParticipaDessaBanca}
                  confirm={true}
                  onClick={onCLickAccept}
                />
                  </>
                )}
                

                <ButtonChangeBancaPersonalStatus
                  enabled={usuarioParticipaDessaBanca}
                  confirm={false}
                  onClick={OnClickDecline}
                />

              </li>
            </ul>
          </div>

        </div>
      </div>




    </div>
  );
}

export default BancaDetailsById;
