import { signOut } from "firebase/auth";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const MainNavbar = ({isAuth, setIsAuth}) => {
  function signOutUser() {
    signOut(auth).then(() => {
      setIsAuth(false)
      window.localStorage.setItem("isAuth", false)

      window.location.href = "/login"
    })  
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand><Link className="custom-navbar-brand" to="/">🅱️uizlet</Link></Navbar.Brand>

        <Nav>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-link" to="/create">Create</Link>
          {isAuth ? <Button className="white-text btn-sm" onClick={signOutUser}>Logout</Button> : <Link className="nav-link" to="/login">Login</Link>}
          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
