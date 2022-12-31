import { signOut } from "firebase/auth";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const MainNavbar = ({isAuth, setIsAuth}) => {
  console.log(isAuth)

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
          
          <Nav.Link><Link className="custom-navbar-link" to="/dashboard">Dashboard</Link></Nav.Link>
          <Nav.Link><Link className="custom-navbar-link" to="/create">Create</Link></Nav.Link>
          {isAuth ? <Button className="white-text btn-sm" onClick={signOutUser}>Logout</Button> : <Nav.Link><Link className="custom-navbar-link" to="/login">Login</Link></Nav.Link>}
          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
