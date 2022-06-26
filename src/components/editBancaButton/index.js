export default function EditButton(props) {

    const isEnabledToEdit = props.isEnabledToEdit
    if (isEnabledToEdit) {
        return <a href={`/edit/${props.id}`} className="tblack">
            <i className="fa-solid fa-pencil text-info"></i>
        </a>
    }

    return <div></div>

    

}