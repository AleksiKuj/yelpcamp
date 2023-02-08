import { useMatch, useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useReducer } from "react"
import campgroundService from "../services/campgrounds"
import reviewService from "../services/reviews"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/esm/Button"
import ReviewForm from "./ReviewForm"

const CampgroundView = ({
  setNotificationMessage,
  setNotificationVariant,
  user,
}) => {
  const [currentCamp, setCurrentCamp] = useState()
  const [initialReviews, setInitialReviews] = useState([])
  const [showError, setShowError] = useState("none")
  const match = useMatch("/campgrounds/:id")
  const navigate = useNavigate()
  //const params = useParams()

  useEffect(() => {
    campgroundService
      .getOne(match.params.id)
      .then((camp) => setCurrentCamp(camp))
  }, [])
  useEffect(() => {
    if (currentCamp) {
      console.log("testiiii")
      setInitialReviews(currentCamp.reviews)
      console.log(currentCamp.reviews)
    }
  }, [currentCamp])
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

  const userHasReviews = (user) => {
    if (
      currentCamp.reviews.filter(
        (review) => review.user.username === user.username
      ).length > 0
    ) {
      return true
    }
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
            <ListGroup.Item>
              Added by {currentCamp.user.username}
            </ListGroup.Item>
          </ListGroup>
          {user !== null && user.username === currentCamp.user.username ? (
            <Card.Body>
              <Link to="edit" className="mx-1">
                <Button variant="success">Edit</Button>
              </Link>

              <Button variant="danger" onClick={() => handleDelete()}>
                DELETE CAMP!
              </Button>
            </Card.Body>
          ) : (
            ""
          )}

          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </div>
      <div className="col-6  p-2 px-1 my-5">
        {userHasReviews(user) === true ? (
          <h2>Reviews</h2>
        ) : (
          <ReviewForm
            camp={currentCamp}
            setNotificationMessage={setNotificationMessage}
            setNotificationVariant={setNotificationVariant}
          />
        )}

        <div>
          {currentCamp.reviews.map((review) => (
            <Card className="my-3" key={review.id}>
              <Card.Body>
                <Card.Text>Rating: {review.rating}</Card.Text>
                <Card.Text>{review.body}</Card.Text>
                <Card.Footer className="text-muted">
                  By {review.user !== undefined ? review.user.username : ""}
                </Card.Footer>
                {user !== null && user.username === review.user.username ? (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    DELETE Review!
                  </Button>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CampgroundView
