import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { LinkContainer } from "react-router-bootstrap"

function NavMenu({ user }) {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    window.location.reload(false)
  }
  return (
    <Navbar collapseOnSelect fixed="top" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>YelpCamp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/campgrounds">
              <Nav.Link>Campgrounds</Nav.Link>
            </LinkContainer>

            {user ? (
              <>
                <LinkContainer to="/campgrounds/new">
                  <Nav.Link>New Campground</Nav.Link>
                </LinkContainer>
                {/* <Navbar.Text>{user.username}</Navbar.Text> */}
                <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Sign in</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavMenu
