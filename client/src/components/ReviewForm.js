import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import reviewService from "../services/reviews"
import "../stars.css"

const ReviewForm = ({
  camp,
  setNotificationMessage,
  setNotificationVariant,
}) => {
  const [reviewBody, setReviewBody] = useState("")
  const [rating, setRating] = useState(3)
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault()
    const today = new Date()
    // const year = today.getFullYear()
    // let month = today.getMonth() + 1
    // let day = today.getDate()
    const review = {
      body: reviewBody,
      rating,
      //dateAdded: `${day}/${month}/${year}`,
      dateAdded: today.getTime().toString(),
    }
    if (form.checkValidity()) {
      await reviewService.addReview(camp.id, review)
      setNotificationVariant("success")
      setNotificationMessage(`Succesfully added ${rating} star review`)
      window.location.reload(false)
      setTimeout(() => {
        setNotificationMessage("")
      }, 5000)
    }
  }
  return (
    <div className="mb-3">
      <h2>Leave a review!</h2>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-0">
          <fieldset
            className="starability-basic"
            onChange={(e) => setRating(e.target.value)}
          >
            <input
              type="radio"
              id="no-rate"
              className="input-no-rate"
              name="rating"
              value="3"
              defaultChecked
              aria-label="No rating."
            />
            <input type="radio" id="first-rate1" name="rating" value="1" />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input type="radio" id="first-rate2" name="rating" value="2" />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input type="radio" id="first-rate3" name="rating" value="3" />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input type="radio" id="first-rate4" name="rating" value="4" />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input type="radio" id="first-rate5" name="rating" value="5" />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              minLength={5}
              maxLength={500}
              required
              as="textarea"
              onChange={(e) => setReviewBody(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a review with 5 charactes minimum.
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
export default ReviewForm
