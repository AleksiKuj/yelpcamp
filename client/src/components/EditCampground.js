import { useState, useEffect } from "react"
import { useNavigate, useMatch, Link } from "react-router-dom"

import campgroundService from "../services/campgrounds"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const EditCampground = ({ setNotificationMessage, setNotificationVariant }) => {
  const [currentCamp, setCurrentCamp] = useState()
  const match = useMatch("/campgrounds/:id/edit")
  const [validated, setValidated] = useState(false)

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    campgroundService
      .getOne(match.params.id)
      .then((camp) => setCurrentCamp(camp))

    console.log(match)
  }, [])

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      console.log("moi")
    }
    setValidated(true)

    e.preventDefault()
    const id = match.params.id
    const campground = {
      title,
      location,
      description,
      image,
      price,
    }
    if (form.checkValidity()) {
      campgroundService.edit(id, campground)

      setNotificationVariant("success")
      setNotificationMessage(`Succesfully edited ${campground.title}`)
      setTimeout(() => {
        setNotificationMessage("")
      }, 5000)
      navigate("/campgrounds")
    }
  }
  if (!currentCamp) {
    return null
  }
  return (
    <div>
      <h1>edit campground</h1>
      <h1>{currentCamp.title}</h1>
      <h2>{currentCamp.location}</h2>
      <Link to={`/campgrounds/${match.params.id}`}>Back</Link>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder={currentCamp.title}
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
            required
            type="text"
            placeholder={currentCamp.location}
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
            required
            type="text"
            placeholder={currentCamp.image}
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
            placeholder={currentCamp.description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid description.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Campground price</Form.Label>
          <InputGroup>
            <InputGroup.Text id="price-label">€</InputGroup.Text>
            <Form.Control
              required
              type="number"
              min={0}
              placeholder={currentCamp.price}
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
      {/* <form onSubmit={handleSubmit}>
        Title
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder={currentCamp.title}
        />
        Location
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          placeholder={currentCamp.location}
        />
        <button type="submit">edit</button>
      </form> */}
    </div>
  )
}
export default EditCampground
