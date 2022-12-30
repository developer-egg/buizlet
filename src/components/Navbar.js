import { Container, Nav, Navbar } from "react-bootstrap";

const MainNavbar = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">🅱️uizlet</Navbar.Brand>

        <Nav>
          <Nav.Link href="dashboard">Dashboard</Nav.Link>
          <Nav.Link href="create">Create</Nav.Link>
          <Nav.Link href="login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
