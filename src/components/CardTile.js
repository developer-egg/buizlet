import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardTile = (props) => {
  return (
    <Link className="card-tile" to={`/buizlets/${props.id}`}>

        <Card className="mt-4 mb-4">
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="text-muted mb-2">by {props.author}</Card.Subtitle>

            <Card.Text>{props.description}</Card.Text>
        </Card.Body>
        </Card>
        </Link>
  );
};

export default CardTile;
