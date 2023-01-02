import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import CardInput from "../components/CardInput";
import { useNavigate } from "react-router-dom";
import { Button, Container, FloatingLabel, Form, Toast } from "react-bootstrap";

const CreateStudySet = ({ cardData, setCardData, isAuth }) => {
  const [cardInputs, setCardInputs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

  function addCard() {
    const currentCardAmount = cardInputs.length + 1;

    const nextCardNumber = currentCardAmount + 1;

    setCardInputs(
      cardInputs.concat([
        <CardInput
          key={nextCardNumber}
          number={nextCardNumber}
          cardData={cardData}
          setCardData={setCardData}
        />,
      ])
    );
  }

  const studySetsCollectionRef = collection(db, "studysets");
  async function createStudySet() {
    let filteredCardData = cardData.filter((card) => card.term != "term");

    await addDoc(studySetsCollectionRef, {
      title: title,
      description: description,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      cards: filteredCardData,
    }).then((res) => {
      navigate('/dashboard')
    }).catch((err) => {
      alert("Failed to Create Buizlet")
    });
  }

  return (
    <Container>
      <h1 className="mt-5">Create a new 🅱️uizlet</h1>

      <Form>
        <Form.Group className="mt-4 mb-4">
          <FloatingLabel label="Title">
            <Form.Control
              type="text"
              placeholder="Enter a title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-5">
          <FloatingLabel label="Description">
            <Form.Control
              as="textarea"
              placeholder="Enter a title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </FloatingLabel>
        </Form.Group>
      </Form>

      <div>
        <CardInput number="1" cardData={cardData} setCardData={setCardData} />
      </div>

      {cardInputs}

      <Button className="white-text add-card-button" onClick={addCard}>Add Card</Button>
      <Button variant="outline-light submit-buizlet-button" onClick={createStudySet}>Submit 🅱️uizlet</Button>
    </Container>
  );
};

export default CreateStudySet;
