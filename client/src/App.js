import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Campgrounds from "./components/Campgrounds"
import CampgroundView from "./components/CampgroundView"
import NewCampground from "./components/NewCampground"
import EditCampground from "./components/EditCampground"
import NavMenu from "./components/NavMenu"
import Footer from "./components/Footer"
import NotFound from "./components/NotFound"
import Notification from "./components/Notification"
import Register from "./components/Register"
import Login from "./components/Login"
import { useState, useEffect } from "react"
import reviewsService from "./services/reviews"
import campgroundsService from "./services/campgrounds"

function App() {
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationVariant, setNotificationVariant] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      campgroundsService.setToken(user.token)
      reviewsService.setToken(user.token)
    }
  }, [])

  return (
    <div className=" d-flex flex-column  bg-dark min-vh-100">
      <Router>
        <NavMenu user={user} />
        <Notification
          message={notificationMessage}
          variant={notificationVariant}
        />

        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/campgrounds" element={<Campgrounds />}></Route>
            <Route
              path="/campgrounds/new"
              element={
                <NewCampground
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
                  user={user}
                />
              }
            ></Route>
            <Route
              path="/campgrounds/:id"
              element={
                <CampgroundView
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
                  user={user}
                />
              }
            ></Route>
            <Route
              path="/campgrounds/:id/edit"
              element={
                <EditCampground
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
                />
              }
            ></Route>
            <Route
              path="/register"
              element={
                <Register
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Login
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
                  setUser={setUser}
                  user={user}
                />
              }
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
