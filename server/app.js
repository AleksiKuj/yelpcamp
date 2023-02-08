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
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const bodyParser = require("body-parser")

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
app.use(cookieParser("secretCode"))
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
