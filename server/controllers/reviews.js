const reviewsRouter = require("express").Router({ mergeParams: true })
const Campground = require("../models/campground")
const Review = require("../models/review")
const catchAsync = require("../utils/catchAsync")
const { reviewSchema } = require("../utils/validationSchemas")

const validateReview = (req, res, next) => {
  const result = reviewSchema.validate(req.body)
  if (result.error) {
    return console.log(result.error.details.map((el) => el.message).join(","))
  } else {
    next()
  }
}

reviewsRouter.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    console.log(req.params.id)
    const review = new Review(req.body)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.json(review)
  })
)

reviewsRouter.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    console.log(id)
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.status(204)
  })
)
module.exports = reviewsRouter
