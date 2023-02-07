import { useMatch, useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import campgroundService from "../services/campgrounds"
import reviewService from "../services/reviews"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/esm/Button"
import ReviewForm from "./ReviewForm"

const CampgroundView = ({ setNotificationMessage, setNotificationVariant }) => {
  const [currentCamp, setCurrentCamp] = useState()
  const [showError, setShowError] = useState("none")
  const match = useMatch("/campgrounds/:id")
  const navigate = useNavigate()
  //const params = useParams()

  useEffect(() => {
    campgroundService
      .getOne(match.params.id)
      .then((camp) => setCurrentCamp(camp))
    // console.log(params.campgroundId)
    //console.log(match.params.id)
  }, [])
  const handleDelete = () => {
    campgroundService.deleteCamp(match.params.id)
    setNotificationVariant("danger")
    setNotificationMessage(`Succesfully deleted ${currentCamp.title}`)
    setTimeout(() => {
      setNotificationMessage("")
    }, 5000)

    navigate("/campgrounds")
  }
  const handleDeleteReview = (id) => {
    reviewService.deleteReview(match.params.id, id)
    setNotificationVariant("danger")
    setNotificationMessage(`Succesfully deleted review`)
    setTimeout(() => {
      setNotificationMessage("")
    }, 5000)
  }

  //if invalid id show error message
  if (!currentCamp) {
    const style = { display: showError }
    setTimeout(() => {
      setShowError("")
    }, 100)
    return (
      <div>
        <h1 style={style}>Campground not found</h1>
      </div>
    )
  }
  return (
    // CHANGE FROM GRID TO FLEX -> flex-row -> on mobile flex-col
    <div className="row">
      <div className="col-6  p-2  my-5">
        <Card>
          <Card.Img variant="top" src={currentCamp.image} />
          <Card.Body>
            <Card.Title>{currentCamp.title}</Card.Title>
            <Card.Text>{currentCamp.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{currentCamp.location}</ListGroup.Item>
            <ListGroup.Item>{currentCamp.price}€/night</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Link to="edit" className="mx-1">
              <Button variant="success">Edit</Button>
            </Link>

            <Button variant="danger" onClick={() => handleDelete()}>
              DELETE CAMP!
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </div>
      <div className="col-6  p-2 px-1 my-5">
        <ReviewForm
          camp={currentCamp}
          setNotificationMessage={setNotificationMessage}
          setNotificationVariant={setNotificationVariant}
        />
        <div>
          {/* move to useEffect and add reviews state
          so page updates on removing or adding review
          same for adding reviews */}
          {currentCamp.reviews.map((review) => (
            <Card className="my-3" key={review.id}>
              <Card.Body>
                <Card.Text>Rating: {review.rating}</Card.Text>
                <Card.Text>{review.body}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  DELETE Review!
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CampgroundView
