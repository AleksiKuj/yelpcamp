import { useState } from "react"
import { useNavigate } from "react-router-dom"
import usersService from "../services/users"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const Register = ({ setNotificationMessage, setNotificationVariant }) => {
  const [validated, setValidated] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      console.log("moi")
    }

    setValidated(true)
    e.preventDefault()

    if (form.checkValidity()) {
      try {
        const user = {
          username,
          email,
          password,
        }
        await usersService.addUser(user)

        setNotificationVariant("success")
        setNotificationMessage(`Succesfully created ${user.username}`)
        setTimeout(() => {
          setNotificationMessage("")
        }, 5000)

        navigate("/campgrounds")
      } catch (e) {
        console.log("e:", e.message)
        setNotificationVariant("danger")
        setNotificationMessage(e.message)
        setTimeout(() => {
          setNotificationMessage("")
        }, 5000)
      }
    }
  }
  return (
    <div>
      <h1 className="text-center">Sign up</h1>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Register
