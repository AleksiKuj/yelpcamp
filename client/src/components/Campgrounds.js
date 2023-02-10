import { useEffect, useState } from "react"

import campgroundService from "../services/campgrounds"
import ClusterMap from "./ClusterMap"
import CampgroundCard from "./CampgroundCard"
import "../stars.css"
import Form from "react-bootstrap/Form"
import "./campgrounds.css"

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([])
  const [sort, setSort] = useState("1")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    campgroundService
      .getAll()
      .then((campgrounds) => setCampgrounds(campgrounds))
  }, [])

  const averageRating = (array) => {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
      sum += array[i].rating
    }
    if (isNaN(sum / array.length)) {
      return 0
    } else {
      return sum / array.length
    }
  }

  const campgroundsToShow = filter
    ? campgrounds.filter((campground) =>
        campground.title.toLowerCase().includes(filter.toLowerCase())
      )
    : campgrounds

  const campgroundsSortedByNumberOfReviews = Object.values(
    campgroundsToShow
  ).sort((a, b) => b.reviews.length - a.reviews.length)

  const campgroundsSortedByAvgRating = Object.values(campgroundsToShow).sort(
    (a, b) => averageRating(b.reviews) - averageRating(a.reviews)
  )

  const showCampgrounds = (sort) =>
    sort.map((campground) => (
      <CampgroundCard campground={campground} averageRating={averageRating} />
    ))

  return (
    <div className="bg-light h-100 ">
      <div className="container mt-5 mb-5">
        <ClusterMap campgrounds={campgrounds} />
        <h1 className="text-center ">All campgrounds</h1>
        <Form>
          <div className="text-center d-flex">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setFilter(e.target.value)}
              className="col-7 mx-2"
            />
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Sort by</option>
              <option value="1">Average Rating</option>
              <option value="2">Number of Reviews</option>
            </Form.Select>
          </div>
        </Form>

        {sort === "1"
          ? showCampgrounds(campgroundsSortedByAvgRating)
          : showCampgrounds(campgroundsSortedByNumberOfReviews)}
      </div>
    </div>
  )
}
export default Campgrounds
