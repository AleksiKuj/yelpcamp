const Joi = require("joi")

module.exports.campgroundSchema = Joi.object({
  title: Joi.string().required().max(50),
  price: Joi.number().required().min(0),
  location: Joi.string().required().max(50),
  description: Joi.string().required().max(500),
  deleteImages: Joi.string().optional().allow(""),
  dateAdded: Joi.string().required(),
})

module.exports.reviewSchema = Joi.object({
  body: Joi.string().required().min(5).max(500),
  rating: Joi.number().required().min(1).max(5),
  dateAdded: Joi.string().required(),
})

module.exports.userSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3).max(30),
})
