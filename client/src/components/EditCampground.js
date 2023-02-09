import { useState, useEffect } from "react"
import { useNavigate, useMatch, Link } from "react-router-dom"

import campgroundService from "../services/campgrounds"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Image from "react-bootstrap/Image"

const EditCampground = ({ setNotificationMessage, setNotificationVariant }) => {
  const [currentCamp, setCurrentCamp] = useState()
  const match = useMatch("/campgrounds/:id/edit")
  const [validated, setValidated] = useState(false)

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState(null)
  const [deleteImages, setDeleteImages] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    campgroundService
      .getOne(match.params.id)
      .then((camp) => setCurrentCamp(camp))
  }, [])

  useEffect(() => {
    const setFields = () => {
      if (currentCamp) {
        setTitle(currentCamp.title)
        setPrice(currentCamp.price)
        setLocation(currentCamp.location)
        setDescription(currentCamp.description)
        console.log("curcamp", currentCamp)
      }
    }
    setFields()
  }, [currentCamp])

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      setDeleteImages([...deleteImages, value])
    } else {
      setDeleteImages(deleteImages.filter((img) => img !== value))
    }
  }

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
    const id = match.params.id
    const campground = {
      title,
      location,
      description,
      image,
      price,
    }
    if (form.checkValidity()) {
      let formData = new FormData()
      if (file) {
        for (let i = 0; i < file.length; i++) {
          formData.append("file", file[i])
        }
      }

      // formData.append("file", file)
      formData.append("title", title)
      formData.append("location", location)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("deleteImages", deleteImages)

      campgroundService.edit(id, formData)
      console.log(formData)

      setNotificationVariant("success")
      setNotificationMessage(
        `Succesfully edited ${campground.title}. It might take a few seconds for the data to update.`
      )
      setTimeout(() => {
        setNotificationMessage("")
      }, 10000)
      navigate(`/campgrounds/${currentCamp.id}`)
    }
  }
  if (!currentCamp) {
    return null
  }
  return (
    <div>
      <h1>{currentCamp.title}</h1>
      <h2>{currentCamp.location}</h2>
      <Link to={`/campgrounds/${match.params.id}`}>Back</Link>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            // placeholder={currentCamp.title}
            value={title}
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
            value={location}
            placeholder={currentCamp.location}
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
            value={description}
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
              value={price}
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

        <div className="mb-3">
          {currentCamp.images.map((image) => (
            <div key={image.filename}>
              <Image
                src={`https://res.cloudinary.com/dvl3hqoba/image/upload/w_200/${image.filename}`}
                thumbnail={"true"}
              />
              <Form.Check
                type={"checkbox"}
                id={`image-${image.filename}`}
                label="Delete?"
                name="deleteImages[]"
                value={image.filename}
                onChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default EditCampground
