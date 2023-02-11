const config = require("./utils/config")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const { errorHandler } = require("./utils/middleware")
const path = require("path")

const campgroundsRouter = require("./controllers/campgrounds")
const reviewsRouter = require("./controllers/reviews")
const usersRouter = require("./controllers/users")

// const mongoUrl = config.MONGODB_URI
// const devMongoUrl = config.DEV_MONGODB_URI

let mongoUrl = ""

if (process.env.NODE_ENV === "dev") {
  mongoUrl = config.DEV_MONGODB_URI
} else {
  mongoUrl = config.MONGODB_URI
}
mongoose.set("strictQuery", false)
console.log(mongoUrl)
mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("error: ", error.message)
  })
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

// use this for react-router to work when deployed
app.use(express.static(path.join(__dirname, "build")))

app.use("/api/campgrounds", campgroundsRouter)
app.use("/api/campgrounds/:id/reviews", reviewsRouter)
app.use("/api/users", usersRouter)

// use this for react-router to work when deployed
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.use(errorHandler)
app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
})
module.exports = app
