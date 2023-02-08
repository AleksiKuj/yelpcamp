import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import campgroundService from "../services/campgrounds"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const NewCampground = ({ setNotificationMessage, setNotificationVariant }) => {
  const [validated, setValidated] = useState(false)
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState("")
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files)
  }

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
      price,
    }
    if (form.checkValidity()) {
      let formData = new FormData()
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i])
      }
      // formData.append("file", file)
      formData.append("title", title)
      formData.append("location", location)
      formData.append("description", description)
      formData.append("price", price)

      campgroundService.create(formData)
      console.log(formData)

      setNotificationVariant("success")
      setNotificationMessage(`Succesfully added ${campground.title}`)
      setTimeout(() => {
        setNotificationMessage("")
      }, 5000)

      //navigate("/campgrounds")
    }
  }
  return (
    <div>
      <h1 className="text-center">New campground</h1>
      <Form
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
        encType="multipart/form-data"
      >
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

        <Form.Label>Add images</Form.Label>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Control
            type="file"
            name="file"
            multiple
            onChange={handleFileChange}
          />
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
