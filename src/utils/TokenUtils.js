export default function getTokenOrEmptyToken() {
    return "Bearer " + localStorage.getItem("access_token");
} 