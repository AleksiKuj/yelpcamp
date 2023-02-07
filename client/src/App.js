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
import { useState } from "react"

function App() {
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationVariant, setNotificationVariant] = useState("")
  return (
    <div className=" d-flex flex-column vh-100">
      <Router>
        <NavMenu />
        <Notification
          message={notificationMessage}
          variant={notificationVariant}
        />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/campgrounds" element={<Campgrounds />}></Route>
            <Route
              path="/campgrounds/new"
              element={
                <NewCampground
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
                />
              }
            ></Route>
            <Route
              path="/campgrounds/:id"
              element={
                <CampgroundView
                  setNotificationMessage={setNotificationMessage}
                  setNotificationVariant={setNotificationVariant}
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
