import { useMatch, Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import campgroundService from "../services/campgrounds"
import reviewService from "../services/reviews"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/esm/Button"
import ReviewForm from "./ReviewForm"
import Carousel from "react-bootstrap/Carousel"
import "../stars.css"
import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax
import "./campgroundView.css"

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

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(12)

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

  useEffect(() => {
    campgroundService
      .getOne(match.params.id)
      .then((camp) => setCurrentCamp(camp))
  }, [])

  useEffect(() => {
    if (currentCamp) {
      setInitialReviews(currentCamp.reviews)
      setLng(currentCamp.geometry.coordinates[0])
      setLat(currentCamp.geometry.coordinates[1])
      document.title = `YelpCamp: ${currentCamp.title}`
    }
  }, [currentCamp])

  useEffect(() => {
    if (map.current) return // initialize map only once
    setTimeout(() => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [lng, lat],
        zoom: zoom,
      })
      //add controls(zoom and rotation)
      map.current.addControl(new mapboxgl.NavigationControl())
      new mapboxgl.Marker({ color: "red" })
        .setLngLat([lng, lat])
        .addTo(map.current)
    }, 250)
  })

  const handleDelete = () => {
    campgroundService.deleteCamp(match.params.id)
    setNotificationVariant("danger")
    setNotificationMessage(`Succesfully deleted ${currentCamp.title}`)

    setTimeout(() => {
      setNotificationMessage("")
    }, 5000)

    navigate("/campgrounds")
  }
  const handleDeleteReview = async (id) => {
    await reviewService.deleteReview(match.params.id, id)
    const updatedReviews = initialReviews.filter((r) => r.id !== id)
    setInitialReviews(updatedReviews)
    console.log(updatedReviews)
    setNotificationVariant("danger")
    setNotificationMessage(`Succesfully deleted review`)
    window.location.reload(false)
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
    <div className="bg-light h-100 " style={{ minHeight: "92vh" }}>
      <div className="container  mt-5 mb-5">
        <div className="" id="main-container">
          <div className="col-6 px-2   my-5 view-container">
            <Card>
              <Carousel>
                {currentCamp.images.length > 0
                  ? currentCamp.images.map((image) => (
                      <Carousel.Item key={image.filename}>
                        <img
                          className="d-block w-100"
                          style={{
                            maxWidth: "100%",
                            width: "50px",
                            height: "350px",
                            objectFit: "cover",
                          }}
                          src={image.url}
                          alt={currentCamp.title}
                        />
                      </Carousel.Item>
                    ))
                  : ""}
              </Carousel>

              <Card.Body>
                <Card.Title>{currentCamp.title}</Card.Title>
                <Card.Title>{currentCamp.test}</Card.Title>
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
                    Delete
                  </Button>
                </Card.Body>
              ) : (
                ""
              )}

              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </div>
          <div className="col-6  px-2 my-5 view-container">
            <div ref={mapContainer} className="map-container" />
            {user !== null ? (
              userHasReviews(user) === true ? (
                <h2>Reviews</h2>
              ) : (
                <ReviewForm
                  camp={currentCamp}
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
                  initialReviews={initialReviews}
                  setInitialReviews={setInitialReviews}
                />
              )
            ) : (
              <h2>Reviews</h2>
            )}

            <div>
              {initialReviews
                ? initialReviews.map((review) => (
                    <Card className="my-3" key={review.id}>
                      <Card.Body>
                        <Card.Title>
                          {review.user !== undefined
                            ? review.user.username
                            : ""}
                        </Card.Title>

                        <p
                          className="starability-result"
                          data-rating={review.rating}
                        >
                          Rated: {review.rating} stars
                        </p>

                        <Card.Text>{review.body}</Card.Text>
                        {user !== null &&
                        user.username === review.user.username ? (
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            Delete review
                          </Button>
                        ) : (
                          ""
                        )}
                      </Card.Body>
                    </Card>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CampgroundView
