const usersRouter = require("express").Router()
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync")
const { userSchema } = require("../utils/validationSchemas")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../utils/config")

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
  catchAsync(async (request, response) => {
    const { username, email, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      email,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  })
)

usersRouter.post("/login", async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  response.status(200).send({ token, username: user.username })
})

usersRouter.get("/getUser", (req, res) => {
  console.log(req.user)
  res.send(req.user)
})

module.exports = usersRouter
