import { useState } from "react"
import { useNavigate } from "react-router-dom"
import campgroundService from "../services/campgrounds"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const NewCampground = () => {
  const [validated, setValidated] = useState(false)

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      console.log("moi")
    }

    setValidated(true)
    e.preventDefault()
    const campground = {
      title,
      location,
      description,
      image,
      price,
    }
    if (form.checkValidity()) {
      campgroundService.create(campground)
      navigate("/campgrounds")
      console.log(campground)
    }
  }
  return (
    <div>
      <h1 className="text-center">New campground</h1>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid title.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid location.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image url</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setImage(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid url.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid description.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Campground price / night</Form.Label>
          <InputGroup>
            <InputGroup.Text id="price-label">€</InputGroup.Text>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              required
              placeholder="0.00"
              aria-describedby="price-label"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid price.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default NewCampground
