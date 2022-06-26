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

function informacoesDoToken(token) {
    const tokenDecoded = jwtDecode(token);

    return {
        exp: tokenDecoded.exp,
        userId: tokenDecoded.id,
        iss: tokenDecoded.iss,
        userRoles: tokenDecoded.permissions,
        userEmail: tokenDecoded.sub
    }

}

export default {getTokenOrEmptyToken, isProfessorOrAbove, informacoesDoToken}
