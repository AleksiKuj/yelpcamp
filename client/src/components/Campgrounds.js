import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import campgroundService from "../services/campgrounds"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import ClusterMap from "./ClusterMap"

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([])

  useEffect(() => {
    campgroundService
      .getAll()
      .then((campgrounds) => setCampgrounds(campgrounds))
  }, [campgrounds.length])

  return (
    <div className="bg-light h-100 ">
      <div className="container mt-5 mb-5">
        <ClusterMap campgrounds={campgrounds} />
        <h1 className="text-center">All campgrounds</h1>

        {campgrounds.map((campground) => (
          <div key={campground.id} className="py-2">
            <Card style={{}} className="d-flex flex-row">
              <Card.Img
                variant="top"
                src={`${campground.images[0].url}`}
                style={{ width: "350px", height: "250px" }}
              />

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
      </div>
    </div>
  )
}
export default Campgrounds
