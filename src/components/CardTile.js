import { Link } from "react-router-dom";

const CardTile = (props) => {
    return (
        <Link to={`/buizlets/${props.id}`}><div><p>{props.title}</p></div></Link>
    )
}

export default CardTile