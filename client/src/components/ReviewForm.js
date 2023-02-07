import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import reviewService from "../services/reviews"

const ReviewForm = ({
  camp,
  setNotificationMessage,
  setNotificationVariant,
}) => {
  const [reviewBody, setReviewBody] = useState("")
  const [rating, setRating] = useState(3)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault()

    const review = {
      body: reviewBody,
      rating,
    }
    if (form.checkValidity()) {
      reviewService.addReview(camp.id, review)
      setNotificationVariant("success")
      setNotificationMessage(`Succesfully added ${rating} star review`)
      setTimeout(() => {
        setNotificationMessage("")
      }, 5000)
    }
  }
  return (
    <div className="mb-3">
      <h2>Leave a review!</h2>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Range
            min={1}
            max={5}
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              required
              as="textarea"
              onChange={(e) => setReviewBody(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a review.
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
