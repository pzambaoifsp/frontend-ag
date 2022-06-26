import jwtDecode from "jwt-decode";

function getTokenOrEmptyToken() {
    return "Bearer " + localStorage.getItem("access_token");
}

function isProfessorOrAbove(token) {

    const tokenDecoded = jwtDecode(token);
    const hasAlunoPermission = tokenDecoded.permissions.indexOf('ALUNO') != -1
    const hasUsuarioPermission = tokenDecoded.permissions.indexOf('USUARIO') != -1

    if (hasAlunoPermission || hasUsuarioPermission) return false

    return true

}

export default {getTokenOrEmptyToken, isProfessorOrAbove}
