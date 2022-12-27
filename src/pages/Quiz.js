import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const Quiz = () => {
//   const [question, setQuestion] = useState("")
//   const [answers, setAnswers] = useState([])

  const terms_list = []
  const definitions_list = []

  let answer_key = {}
  let quiz = []

  let { id } = useParams();

  const studySetsCollectionRef = collection(db, "studysets");

  useEffect(() => {
    function generateQuiz() {
        for(let i = 0; i < terms_list.length; i++) {
            let question = terms_list[Math.floor(Math.random() * terms_list.length)]

            let correctAnswer

            for (const term in answer_key) {
                if(term === question) {
                    correctAnswer = answer_key[term]
                }
            }

            let otherAnswers = definitions_list
            otherAnswers = otherAnswers.filter((answer) => answer !== correctAnswer)

            const otherAnswersLength = otherAnswers.length

            for(let i = 0; i < otherAnswersLength - 3; i++) {
                // remove a random one
                let index = Math.floor(Math.random() * otherAnswers.length)

                otherAnswers = otherAnswers.filter((answer) => otherAnswers.indexOf(answer) !== index)
            }

            if(quiz.length !== terms_list.length) {
                quiz.push({
                    question,
                    correctAnswer,
                    incorrectAnswers: otherAnswers
                })
            }
        }
    }

    async function getStudySet() {
      const data = await getDocs(studySetsCollectionRef);
      const allSets = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let currentSet = allSets.filter((set) => set.id === id);
      currentSet = currentSet[0];

      currentSet.cards.forEach(card => {
        // crete the answer key
        answer_key[`${card.term}`] = card.definition

        // Set the list of terms and definitoins
        if(terms_list.length < currentSet.cards.length) {
            terms_list.push(card.term)
            definitions_list.push(card.definition)
        }
      });

      generateQuiz()

      // Set the initial values for the quiz
    //   setQuestion(terms_list[Math.floor(Math.random() * terms_list.length)])

    //   setStudySetData(currentSet);
    }

    getStudySet();
  }, []);

  return (
    <>
        <h1>Q</h1>

        <button>Answer 1</button>
        <button>Answer 2</button>
        <button>Answer 3</button>
        <button>Answer 4</button>
    </>
  );
};

export default Quiz;
