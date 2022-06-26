export default function AddBancaButton(props) {

    const isEnabled = props.enabled;

    if (isEnabled)
    return <a href="/details" className="align-right add-mb">
          <i className="fa-solid fa-plus"></i> Adicionar nova Banca
        </a>

    return <div></div>
}