const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")

const mongoUrl =
  "mongodb+srv://fullstack:fullstack@cluster0.azj3yur.mongodb.net/yelp-camp-dev?retryWrites=true&w=majority"

mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("error: ", error.message)
  })

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 20; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/1114848",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolore officia aliquid veritatis animi et excepturi delectus nesciunt eos ratione ut consequatur nisi quo consectetur architecto, eius sed. Magni, nisi.",
      price,
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
