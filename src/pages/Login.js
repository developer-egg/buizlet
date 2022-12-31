import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();

  function signInWithGoogle() {
    signInWithPopup(auth, provider).then((res) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      console.log("set isAuth to true")
      navigate("/dashboard");
    });
  }

  return (
    <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h1 className="mb-5">Sign in to 🅱️uizlet</h1>

      <button onClick={signInWithGoogle} className="login-with-google-btn">Sign in with Google</button>
    </Container>
  );
};

export default Login;
