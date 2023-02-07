const Joi = require("joi")

module.exports.campgroundSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  location: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
})

module.exports.reviewSchema = Joi.object({
  body: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
})

module.exports.userSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3).max(30),
})
