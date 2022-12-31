import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate()

  return (
    <>
      <Container>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <h1 className="display-1">Quizlet? More like 🅱️uizlet!</h1>
          <h2 className="display-5">
            The worst flashcard platform of all time
          </h2>
          <p className="lead mt-4">
            Welcome to Buizlet, the worst possible tool for studying and
            learning. Our platform allows you to create and share digital
            flashcards and quizzes with friends and classmates, however we
            highly recommend that you run away and use quizlet instead.
          </p>
          
          <Button href="" variant="primary" size="lg" className="white-text mt-4 home-page-button" onClick={() => {navigate("/dashboard")}}>
            I hate myself
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
