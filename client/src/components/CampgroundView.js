import { useMatch, useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import campgroundService from "../services/campgrounds"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { LinkContainer } from "react-router-bootstrap"
import Button from "react-bootstrap/esm/Button"
import ReviewForm from "./ReviewForm"

const CampgroundView = () => {
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
    console.log(match.params.id)
  }, [])
  const handleDelete = () => {
    campgroundService.deleteCamp(match.params.id)
    navigate("/campgrounds")
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
    <div className="row">
      <div className="col-6 offset-3 p-0 my-5">
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

          {/* <Card.Footer className="text-muted">
          <Link to="/campgrounds">All campgrounds</Link>
        </Card.Footer> */}
        </Card>
        <ReviewForm camp={currentCamp} />
      </div>
    </div>
  )
}
export default CampgroundView
