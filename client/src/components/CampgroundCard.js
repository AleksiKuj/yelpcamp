import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import "../stars.css"
import "./campgrounds.css"
import "../stars.css"
const CampgroundCard = ({ campground, averageRating }) => {
  return (
    <div key={campground.id} className="py-2">
      <Card className="d-flex  camp-card">
        <Card.Img
          variant="top"
          src={`${campground.images[0].url}`}
          style={{ width: "350px", height: "250px", alignSelf: "center" }}
        />

        <Card.Body>
          <Card.Title className="text-center">{campground.title}</Card.Title>
          <Card.Text>
            <div
              className="starability-result text-center"
              style={{ margin: "0 auto" }}
              data-rating={Math.ceil(averageRating(campground.reviews))}
            >
              A Rated: {Math.ceil(averageRating(campground.reviews))} stars
            </div>
          </Card.Text>
          <Card.Text>{campground.description}</Card.Text>
          <Card.Text className="text-muted">{campground.location}</Card.Text>
          <Link to={campground.id}>
            <Button variant="primary">View {campground.title}</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  )
}
export default CampgroundCard
