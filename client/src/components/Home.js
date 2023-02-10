import "./Home.css"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
const Home = () => {
  return (
    <div
      className="main-container d-flex w-100 h-100 py-5 flex-column text-center"
      style={{ minHeight: "95vh" }}
    >
      <div
        className="cover-container d-flex w-100 h-100 p-3
       mx-auto flex-column"
      >
        <div className="px-3">
          <h1>YelpCamp</h1>
          <p className="lead">Welcome to YelpCamp!</p>
          <p className="lead">
            Jump right in and explore our many campgrounds. Feel free to share
            some of your own and comment on others!
          </p>
          <Link to="/campgrounds">
            <Button variant="light" size="lg" className="font-weight-bold">
              View Campgrounds
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
