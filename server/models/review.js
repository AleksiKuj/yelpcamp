const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateAdded: String,
})

reviewSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model("Review", reviewSchema)
