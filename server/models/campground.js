const mongoose = require("mongoose")
const Review = require("./review")
const Schema = mongoose.Schema

const campgroundSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateAdded: String,
})

campgroundSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

//removes campgrounds reviews when deleting campground
campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    })
  }
})

module.exports = mongoose.model("Campground", campgroundSchema)
