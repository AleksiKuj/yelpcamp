import { useState } from "react"
import { useNavigate } from "react-router-dom"
import usersService from "../services/users"
import campgroundsService from "../services/campgrounds"
import reviewsService from "../services/reviews"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useEffect } from "react"
import Card from "react-bootstrap/Card"

const Login = ({
  setNotificationMessage,
  setNotificationVariant,
  setUser,
  user,
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  })

  const handleLogin = async () => {
    try {
      const credentials = {
        username,
        password,
      }
      const user = await usersService.login(credentials)
      reviewsService.setToken(user.token)
      campgroundsService.setToken(user.token)
      setUser(user)
      console.log("login success")
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setNotificationVariant("success")
      setNotificationMessage(`Succesfully logged in as ${credentials.username}`)
      setTimeout(() => {
        setNotificationMessage("")
      }, 5000)

      navigate("/campgrounds")
    } catch (e) {
      setNotificationVariant("danger")
      setNotificationMessage("Invalid username or password")
      setTimeout(() => {
        setNotificationMessage("")
      }, 5000)

      return e
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin()
  }

  return (
    <div className="bg-light h-100 " style={{ minHeight: "92vh" }}>
      <div className="container d-flex justify-content-center mt-5">
        <Card style={{ width: "18rem" }} className="mt-5">
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <Card.Footer>Test credentials Test:Test</Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Login
