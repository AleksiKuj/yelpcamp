const reviewsRouter = require("express").Router({ mergeParams: true })
const Campground = require("../models/campground")
const Review = require("../models/review")
const catchAsync = require("../utils/catchAsync")
const { reviewSchema } = require("../utils/validationSchemas")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const config = require("../utils/config")

const validateReview = (req, res, next) => {
  const result = reviewSchema.validate(req.body)
  if (result.error) {
    return console.log(result.error.details.map((el) => el.message).join(","))
  } else {
    next()
  }
}
const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
}

reviewsRouter.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const user = await User.findById(decodedToken.id)

    const review = new Review({
      body: body.body,
      rating: body.rating,
      user: user._id,
    })

    campground.reviews = campground.reviews.concat(review._id)
    await review.save()
    await campground.save()

    res.json(review)
  })
)

reviewsRouter.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    const reviewToDelete = await Review.findById(reviewId)
    if (!reviewToDelete) {
      return res.status(204).end()
    }

    if (
      reviewToDelete.user.username &&
      reviewToDelete.user.username !== req.user.id
    ) {
      return res.status(401).json({
        error: "only the creator can delete a review",
      })
    }
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.status(204)
  })
)
module.exports = reviewsRouter
