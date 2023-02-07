const usersRouter = require("express").Router()
const passport = require("passport")
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync")
const { userSchema } = require("../utils/validationSchemas")

const validateUser = (req, res, next) => {
  //joi userSchema
  const result = userSchema.validate(req.body)
  if (result.error) {
    return res
      .status(400)
      .send(result.error.details.map((el) => el.message).join(","))
  } else {
    next()
  }
}

usersRouter.post(
  "/register",
  validateUser,
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body
      const user = new User({ email, username })
      const newUser = await User.register(user, password)
      res.json(newUser)
    } catch (e) {
      console.log(e.message)
      if (e.code === 11000) {
        return res.status(400).send("Email already exists")
      }
      return res.status(400).send(e.message)
    }
  })
)
usersRouter.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("SIGNED IN")
  res.json(req.body)
})

module.exports = usersRouter
