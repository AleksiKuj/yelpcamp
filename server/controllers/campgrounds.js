const campgroundsRouter = require("express").Router()
const Campground = require("../models/campground")
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync")
const { campgroundSchema } = require("../utils/validationSchemas")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const { storage } = require("../cloudinary")
const { cloudinary } = require("../cloudinary")
const upload = multer({ storage })
const config = require("../utils/config")
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const geocoder = mbxGeocoding({ accessToken: config.MAPBOX_TOKEN })

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
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "reviews",
      })
    res.json(campgrounds)
  })
)

campgroundsRouter.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "user",
        select: "username",
      })
    res.json(campground)
  })
)

campgroundsRouter.put(
  "/:id",
  upload.array("file"),
  validateCampground,
  catchAsync(async (req, res) => {
    const body = req.body
    const geoData = await geocoder
      .forwardGeocode({
        query: body.location,
        limit: 1,
      })
      .send()
    console.log(geoData.body.features[0].geometry)
    res.send("OK!")

    const campground = await Campground.findByIdAndUpdate(req.params.id, {
      title: body.title,
      description: body.description,
      location: body.location,
      price: body.price,
      dateAdded: body.dateAdded,
      geometry: geoData.body.features[0].geometry,
    })
    console.log("deleteimages", body.deleteImages.split(","))
    const images = req.files.map((f) => ({ url: f.path, filename: f.filename }))
    campground.images.push(...images)

    //delete image by turning body.deleteImages into an array
    // also destroys it from cloudinary
    if (body.deleteImages) {
      for (let filename of body.deleteImages.split(",")) {
        await cloudinary.uploader.destroy(filename)
      }
      await campground.updateOne({
        $pull: { images: { filename: { $in: body.deleteImages.split(",") } } },
      })
      console.log(campground)
    }

    await campground.save()
  })
)

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
}

campgroundsRouter.post(
  "/",

  upload.array("file"),
  validateCampground,
  async (req, res) => {
    const body = req.body
    const geoData = await geocoder
      .forwardGeocode({
        query: body.location,
        limit: 1,
      })
      .send()

    if (geoData.body.features.length === 0) {
      return res.status(401).json({
        error: "invalid location",
      })
    }
    console.log(geoData.body)
    res.send("OK!")

    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET)
    const user = await User.findById(decodedToken.id)
    console.log(body.title)
    const campground = new Campground({
      title: body.title,
      description: body.description,
      location: body.location,
      price: body.price,
      dateAdded: body.dateAdded,
      user: user._id,
      geometry: geoData.body.features[0].geometry,
    })
    campground.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }))
    const savedCampground = await campground.save()
    user.campgrounds = user.campgrounds.concat(savedCampground._id)
    await user.save()
    console.log(campground)
  }
)

campgroundsRouter.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const campgroundToDelete = await Campground.findById(id)
    if (!campgroundToDelete) {
      return res.status(204).end()
    }

    if (
      campgroundToDelete.user.username &&
      campgroundToDelete.user.username !== req.user.id
    ) {
      return res.status(401).json({
        error: "only the creator can delete a blog",
      })
    }
    await Campground.findByIdAndDelete(id)
    res.status(204)
  })
)

module.exports = campgroundsRouter
