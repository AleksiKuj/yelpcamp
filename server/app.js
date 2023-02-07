const config = require("./utils/config")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const { errorHandler } = require("./utils/middleware")

const campgroundsRouter = require("./controllers/campgrounds")
const reviewsRouter = require("./controllers/reviews")

const mongoUrl = config.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("error: ", error.message)
  })

app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())

app.use("/api/campgrounds", campgroundsRouter)
app.use("/api/campgrounds/:id/reviews", reviewsRouter)

app.use(errorHandler)
app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
})
module.exports = app
