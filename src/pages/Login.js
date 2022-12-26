import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    <>
      <h1>Sign In To Continue</h1>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </>
  );
};

export default Login;
