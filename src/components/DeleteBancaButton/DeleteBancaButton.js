import AgendamentoDataSource from "../../dataSource/AgendamentoDataSource";
import TokenUtils from "../../utils/TokenUtils";

export default function DeleteBancaButton(props) {

    const reloadPage = () => window.location.reload();

    const id = props.id

    const handleDeleteAgendamento = (id) => {
        const token = TokenUtils.getTokenOrEmptyToken()
    
        const response = AgendamentoDataSource.deleteAgendamentoById(token, id).then(
            reloadPage()
        )
      };

    const isEnabledToDelete = (props.isEnabledToDelete) ? true : false

    if (isEnabledToDelete)
        return <i
            id="icone-click"
            onClick={() => handleDeleteAgendamento(id)}
            className="fa-solid fa-trash"
        ></i>
    
    return <div></div>
}