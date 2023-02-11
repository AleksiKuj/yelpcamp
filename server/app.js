const config = require("./utils/config")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const session = require("express-session")
const { errorHandler } = require("./utils/middleware")

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
console.log(mongoUrl)
mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("error: ", error.message)
  })

app.use(morgan("tiny"))
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use(express.json())

app.use(
  session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
)

app.use("/api/campgrounds", campgroundsRouter)
app.use("/api/campgrounds/:id/reviews", reviewsRouter)
app.use("/api/users", usersRouter)

app.use(errorHandler)
app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
})
module.exports = app
