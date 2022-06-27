export default function ButtonChangeBancaPersonalStataus(props) {
    const enabled = props.enabled;
    const confirm = props.confirm;
    const handleOnClick = props.onClick;

    if (enabled && confirm) {
        return <div className="row">
            <div className="col-md-6 col-6">
                <i className="fas fa-check" />
                <strong className="margin-10px-left ml-2">
                    Confirmar agendamento:
                </strong>
            </div>
            <button
                type="submit"
                className="btn btn--radius-2 btn--blue-2 float-right mb-5"
                onClick={handleOnClick}
            >
                Clique aqui para confirmar agendamento na banca

            </button>
        </div>
    } else if (enabled && !confirm) {
        return <div className="row">
            <div className="col-md-6 col-6">
                <i className="fas fa-close" />
                <strong className="margin-10px-left ml-2">
                    Cancelar agendamento:
                </strong>
            </div>
            <button
                type="submit"
                className="btn btn--radius-2 btn--blue-2 float-right mb-5 bg-danger"
                onClick={handleOnClick}
            >
                Clique aqui para cancelar agendamento na banca

            </button>
        </div>
    } else {
        return ""
    }
}