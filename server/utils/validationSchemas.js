const BaseJoi = require("joi")
const sanitizeHtml = require("sanitize-html")
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        })
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value })
        return clean
      },
    },
  },
})
const Joi = BaseJoi.extend(extension)
module.exports.campgroundSchema = Joi.object({
  title: Joi.string().required().max(50).escapeHTML(),
  price: Joi.number().required().min(0),
  location: Joi.string().required().max(50).escapeHTML(),
  description: Joi.string().required().max(500).escapeHTML(),
  deleteImages: Joi.string().optional().allow(""),
  dateAdded: Joi.string().required(),
})

module.exports.reviewSchema = Joi.object({
  body: Joi.string().required().min(5).max(500).escapeHTML(),
  rating: Joi.number().required().min(1).max(5),
  dateAdded: Joi.string().required(),
})

module.exports.userSchema = Joi.object({
  username: Joi.string().required().min(3).max(30).escapeHTML(),
  email: Joi.string().required().email().escapeHTML(),
  password: Joi.string().required().min(3).max(30).escapeHTML(),
})
