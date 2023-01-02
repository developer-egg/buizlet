import { setIndexConfiguration } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FloatingLabel, FormControl, FormGroup } from "react-bootstrap";

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
      <h3>{number}</h3>
      <hr />

      <FormGroup className="mt-4">
        <FloatingLabel label="Term">
            <FormControl
              className="mb-3"
              type="text"
              placeholder="Enter a term"
              onChange={(event) => {
                setTerm(event.target.value);
              }}
            />
        </FloatingLabel>
      </FormGroup>

      <FormGroup className="mb-5">
        <FloatingLabel label="Definition">
            <FormControl
              type="text"
              placeholder="Enter a definition"
              onChange={(event) => {
                setDefinition(event.target.value);
              }}
            />
        </FloatingLabel>
      </FormGroup>
    </div>
  );
};

export default CardInput;
