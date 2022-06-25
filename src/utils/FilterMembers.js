  const membersUsuarios = (users) => Object.values(users).filter(user => user.permission == "USUARIO");
  const membersAlunos = (users) => Object.values(users).filter(user => user.permission == "ALUNO");
  const membersProfessores = (users) => Object.values(users).filter(user => user.permission == "PROFESSOR");
  const membersAdministradores = (users) => Object.values(users).filter(user => user.permission == "ADMIN");
  const membersAdminDaBanca = (users) => Object.values(users).filter(user => user.permission == "TODO");

  export default {membersUsuarios, membersAlunos, membersProfessores, membersAdministradores, membersAdminDaBanca}
  