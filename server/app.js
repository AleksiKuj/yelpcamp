const config = require("./utils/config")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const session = require("express-session")
const { errorHandler } = require("./utils/middleware")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")

const campgroundsRouter = require("./controllers/campgrounds")
const reviewsRouter = require("./controllers/reviews")
const usersRouter = require("./controllers/users")

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

const sessionConfig = {
  secret: "salaisuus",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}

app.use(session(sessionConfig))
//app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use("/api/campgrounds", campgroundsRouter)
app.use("/api/campgrounds/:id/reviews", reviewsRouter)
app.use("/api/users", usersRouter)

app.use(errorHandler)
app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
})
module.exports = app
