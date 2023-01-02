import { Card } from "react-bootstrap";

const SetCard = ({cardFace, flipCard}) => {
    return (
        <Card onClick={flipCard} className="set-card">
            <Card.Body><Card.Title className="card-face mt-5">{cardFace}</Card.Title></Card.Body>
        </Card>
    );
}

export default SetCard;