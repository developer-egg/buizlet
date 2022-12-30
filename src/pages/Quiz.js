import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const Quiz = () => {
  const [question, setQuestion] = useState("")
  const [answers, setAnswers] = useState([])

  const termsList = []
  const definitionsList = []
  let answerKey = {}

  const [quiz, setQuiz] = useState([])

  const [questionNumber, setQuestionNumber] = useState(-1);

  let { id } = useParams();

  const studySetsCollectionRef = collection(db, "studysets");

  function displayNextQuestion() {
    setQuestionNumber(questionNumber + 1)

    if(questionNumber < quiz.length - 1) {
      let nextQuestion = quiz[questionNumber]

      setQuestion(nextQuestion.question)
      // setAnswers()
      setAnswers(nextQuestion.incorrectAnswers.concat([nextQuestion.correctAnswer]))
    } else {
      // finish quiz logic
    }
  }

  useEffect(() => {
    function generateQuiz() {
        let quizObj = [];

        for(let i = 0; i < termsList.length; i++) {
            let question = termsList[Math.floor(Math.random() * termsList.length)]

            let correctAnswer

            for (const term in answerKey) {
                if(term === question) {
                    correctAnswer = answerKey[term]
                }
            }

            let otherAnswers = definitionsList
            otherAnswers = otherAnswers.filter((answer) => answer !== correctAnswer)

            const otherAnswersLength = otherAnswers.length

            for(let i = 0; i < otherAnswersLength - 3; i++) {
                // remove a random one
                let index = Math.floor(Math.random() * otherAnswers.length)

                otherAnswers = otherAnswers.filter((answer) => otherAnswers.indexOf(answer) !== index)
            }

            if(quizObj.length !== termsList.length) {
                quizObj.push({
                    question,
                    correctAnswer,
                    incorrectAnswers: otherAnswers
                })
            }

            setQuiz(quizObj)


        }
    }

    async function getStudySet() {
      const data = await getDocs(studySetsCollectionRef);
      const allSets = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let currentSet = allSets.filter((set) => set.id === id);
      currentSet = currentSet[0];

      currentSet.cards.forEach(card => {
        // crete the answer key
        answerKey[`${card.term}`] = card.definition

        // Set the list of terms and definitoins
        if(termsList.length < currentSet.cards.length) {
            termsList.push(card.term)
            definitionsList.push(card.definition)
        }
      });

      generateQuiz()
      displayNextQuestion()

      // Set the initial values for the quiz
    //   setQuestion(termsList[Math.floor(Math.random() * termsList.length)])

    //   setStudySetData(currentSet);
    }

    getStudySet();
  }, []);

  return (
    <>
        <h1>{question}</h1>

        {/* <button onClick={() => {checkAnswer(answers[0])}}>{answers[0]}</button>
        <button onClick={() => {checkAnswer(answers[1])}}>{answers[1]}</button>
        <button onClick={() => {checkAnswer(answers[2])}}>{answers[2]}</button>
        <button onClick={() => {checkAnswer(answers[3])}}>{answers[3]}</button> */}
    </>
  );
};

export default Quiz;
