const campgroundsRouter = require("express").Router()
const Campground = require("../models/campground")
const catchAsync = require("../utils/catchAsync")
const { campgroundSchema } = require("../utils/validationSchemas")

const validateCampground = (req, res, next) => {
  //joi campgroundSchema
  const result = campgroundSchema.validate(req.body)
  if (result.error) {
    return console.log(result.error.details.map((el) => el.message).join(","))
  } else {
    next()
  }
}

campgroundsRouter.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.json(campgrounds)
  })
)
campgroundsRouter.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    )
    res.json(campground)
  })
)
campgroundsRouter.put(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = req.body
    await Campground.findByIdAndUpdate(req.params.id, campground)
    res.json(campground)
  })
)
campgroundsRouter.post(
  "/",
  validateCampground,
  catchAsync(async (req, res) => {
    const campground = new Campground(req.body)
    await campground.save()
    res.json(campground)
  })
)

campgroundsRouter.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id
    await Campground.findByIdAndDelete(id)
    res.status(204)
  })
)

module.exports = campgroundsRouter
