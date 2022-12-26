import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

const StudySet = () => {
  const [studySetData, setStudySetData] = useState([]);
  const [cardFace, setCardFace] = useState("Term");

  let { id } = useParams();

  const studySetsCollectionRef = collection(db, "studysets");

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    async function getStudySet() {
      const data = await getDocs(studySetsCollectionRef);
      const allSets = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let currentSet = allSets.filter((set) => set.id === id);
      currentSet = currentSet[0];

      setCardFace(currentSet.cards[0].term);
      setStudySetData(currentSet);
    }

    getStudySet();
  }, []);

  useEffect(() => {
    if (studySetData.cards !== undefined) {
      setCardFace(studySetData.cards[currentCardIndex].term);
    }
  }, [currentCardIndex]);

  function nextCard() {
    let cards = studySetData.cards;

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  }

  function prevCard() {
    let cards = studySetData.cards;

    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(cards.length - 1);
    }
  }

  function flipCard() {
    let cards = studySetData.cards;
    let currentCard = cards[currentCardIndex];

    if (cardFace === currentCard.term) {
      setCardFace(currentCard.definition);
    } else if (cardFace === currentCard.definition) {
      setCardFace(currentCard.term);
    }
  }

  return (
    <>
      <h1>{studySetData.title}</h1>
      <p>
        {studySetData.author === undefined
          ? "by Anonymous"
          : "by " + studySetData.author.name}
      </p>
      <p>{studySetData.description}</p>
      <div>
        <button onClick={prevCard}>&lt;</button>
        <button onClick={flipCard}>{cardFace}</button>
        <button onClick={nextCard}>&gt;</button>
      </div>
    </>
  );
};

export default StudySet;
