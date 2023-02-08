import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import campgroundService from "../services/campgrounds"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([])

  useEffect(() => {
    campgroundService
      .getAll()
      .then((campgrounds) => setCampgrounds(campgrounds))
  }, [campgrounds.length])

  return (
    <div>
      <h1>ALL Campgrounds!</h1>
      <ul>
        {campgrounds.map((campground) => (
          <div key={campground.id}>
            <Card style={{}} className="d-flex flex-row">
              <Card.Img variant="top" src={campground.images[0].url} />
              <Card.Body>
                <Card.Title>{campground.title}</Card.Title>
                <Card.Text>{campground.description}</Card.Text>
                <Card.Text className="text-muted">
                  {campground.location}
                </Card.Text>
                <Link to={campground.id}>
                  <Button variant="primary">View {campground.title}</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </ul>
    </div>
  )
}
export default Campgrounds
