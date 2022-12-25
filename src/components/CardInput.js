import { useState, useEffect } from "react";

const CardInput = ({ number, cardData, setCardData }) => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    let cardDataCopy = cardData;

    // get the card object
    let cardObj = cardDataCopy[number - 1];

    if (cardObj != undefined) {
      // set the term and definition of the object
      cardObj.term = term;
      cardObj.definition = definition;

      // set the new card object in the card data copy
      cardDataCopy[number - 1] = cardObj;

      // update the card data
      setCardData(cardDataCopy);
    }
  }, [term, definition]);

  return (
    <div>
      <button onClick={() => {
        console.log(cardData)
      }}>test</button>

      <h3>{number}</h3>
      <hr />
      <input
        placeholder="term"
        onChange={(event) => {
          setTerm(event.target.value);
        }}
      />
      <input
        placeholder="definition"
        onChange={(event) => {
          setDefinition(event.target.value);
        }}
      />
    </div>
  );
};

export default CardInput;
