import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./components/Home"
import Campgrounds from "./components/Campgrounds"
import CampgroundView from "./components/CampgroundView"
import NewCampground from "./components/NewCampground"
import EditCampground from "./components/EditCampground"
import NavMenu from "./components/NavMenu"
import Footer from "./components/Footer"
import NotFound from "./components/NotFound"

function App() {
  return (
    <div className=" d-flex flex-column vh-100">
      <Router>
        <NavMenu />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/campgrounds" element={<Campgrounds />}></Route>
            <Route path="/campgrounds/new" element={<NewCampground />}></Route>
            <Route path="/campgrounds/:id" element={<CampgroundView />}></Route>
            <Route
              path="/campgrounds/:id/edit"
              element={<EditCampground />}
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
