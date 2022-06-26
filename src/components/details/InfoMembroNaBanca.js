export default function InfoMembroNaBanca(props) {

    const username = props.username;
    const prontuario = props.prontuario;
    const statusAgendamento = props.statusAgendamento

    return <div>
        <p>{username} - {prontuario}</p>
        <p className="ml-2">Status: {statusAgendamento}</p>
    </div>
}