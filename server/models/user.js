const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

//automatically adds username and password fields
userSchema.plugin(passportLocalMongoose)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model("User", userSchema)
