import api from "../services/api";
import TokenUtils from "../utils/TokenUtils";

async function addAgendamento(
  titulo,
  descricao,
  tipoBanca,
  tema,
  dataAgendamento,
  listaIdParticipantes,
  listaIdAvaliadores,
  statusAgendamento,
  adminsBanca
) {
  const response = await api.post(
    "/agendamentos",
    {
      titulo,
      descricao,
      tipoBanca,
      tema,
      dataAgendamento,
      listaIdParticipantes,
      listaIdAvaliadores,
      statusAgendamento,
      adminsBanca
    },
    {
      headers: {
        Authorization: TokenUtils.getTokenOrEmptyToken(),
      },
    }
  )

  return response;
}

async function getAgendamentoById(accessToken, id) {
  const response = await api
    .get(`agendamentos/${id}`, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    })

  return response;
}
async function deleteAgendamentoById(accessToken, id) {
  const response = await api.delete(`agendamentos/${id}`, {
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  })

  return response
}

async function getAgendamentos(accessToken) {

  const response = await api.get("/agendamentos", {
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  });

  return response;
}

async function updateAgendamento(
  id,
  titulo,
  descricao,
  tipoBanca,
  tema,
  dataAgendamento,
  listaIdParticipantes,
  listaIdAvaliadores,
  statusAgendamento,
  adminsBanca,
  antigaListaIdAdmins
) {
  const response = await api.put(
    "/agendamentos/",
    {
      id: parseInt(id),
      titulo,
      descricao,
      tipoBanca,
      tema,
      dataAgendamento,
      listaIdParticipantes,
      listaIdAvaliadores,
      statusAgendamento,
      adminsBanca
    },
    {
      headers: {
        Authorization: TokenUtils.getTokenOrEmptyToken(),
      },
    }
  )

  if (response.status == 200) {
    const idsParaRemover = antigaListaIdAdmins.filter(idUsuario => adminsBanca.indexOf(idUsuario) == -1);
    const idsParaAdicionar = adminsBanca.filter(idUsuario => antigaListaIdAdmins.indexOf(idUsuario) == -1)
    idsParaAdicionar.forEach(idUsuario => {
      api.post(`/agendamentos/add-admin/${id}/${idUsuario}`,{},{
        headers: {
          Authorization: TokenUtils.getTokenOrEmptyToken(),
        },
      });
    })
    console.log(idsParaRemover)
    idsParaRemover.forEach(idUsuario => {
      console.log(idUsuario)
      api.post(`/agendamentos/delete-admin/${id}/${idUsuario}`,{},{
        headers: {
          Authorization: TokenUtils.getTokenOrEmptyToken(),
        },
      });
    })
  }

  

  return response;
}

export default { addAgendamento, getAgendamentoById, deleteAgendamentoById, getAgendamentos, updateAgendamento } 