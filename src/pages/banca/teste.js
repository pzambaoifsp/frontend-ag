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


function BancaDetailsById() {
  const router = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState();

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

  useEffect(() => {
    const { id } = router;
    setId(id);

    const token = TokenUtils.getTokenOrEmptyToken();

    const response = AgendamentoDataSource.getAgendamentoById(token, id)
      .then((response) => {
        console.log(response.data)
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
      });
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



  return (
    <div>
      <Header name={"Calendário de Bancas"}></Header>
      <div className="wrapper wapper--w900">
        <div className="container">
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th><font size='5' style={{ textTransform: 'uppercase'}}>{titulo}</font></th>
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
                        Status:
                      </strong>
                    </div>
                    <div className="col-md-6 col-6">
                      <p>{statusAgendamento}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          
        </div>
      </div>



      
    </div>
  );
}

export default BancaDetailsById;
