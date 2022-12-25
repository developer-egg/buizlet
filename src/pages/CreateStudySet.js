import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import CardInput from "../components/CardInput";
import { useNavigate } from "react-router-dom";


const CreateStudySet = ({cardData, setCardData, isAuth}) => {
  const [cardInputs, setCardInputs] = useState([]);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  let navigate = useNavigate()

  useEffect(() => {
    if(!isAuth) {
      navigate("/login")
    }
  }, [])

  function addCard() {
    const currentCardAmount = cardInputs.length + 1;

    const nextCardNumber = currentCardAmount + 1;

    setCardInputs(cardInputs.concat([<CardInput key={nextCardNumber} number={nextCardNumber} cardData={cardData} setCardData={setCardData} />]));
  }

  const studySetsCollectionRef = collection(db, "studysets")
  async function createStudySet() {
    let filteredCardData = cardData.filter(card => card.term != "term")

    await addDoc(studySetsCollectionRef, {
      title: title,
      description: description,
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
      cards: filteredCardData
    })
  }

  return (
    <>
      <h1>Create a new 🅱️uizlet</h1>

      <div>
        <input placeholder="Enter a title..." onChange={(event) => {
            setTitle(event.target.value)
        }}/>
        <textarea placeholder="Add a description..." onChange={(event) => {
            setDescription(event.target.value)
        }}/>.
        <button onClick={createStudySet}>Create 🅱️uizlet</button>
      </div>

      <div>
        <CardInput number="1" cardData={cardData} setCardData={setCardData}/>
      </div>

      {cardInputs}

      <button onClick={addCard}>Add Card</button>
      <button onClick={createStudySet}>Create 🅱️uizlet</button>
    </>
  );
};

export default CreateStudySet;
