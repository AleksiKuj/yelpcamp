const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")
const Review = require("../models/review")

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
  await Review.deleteMany({})
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      user: "63e370cb9d4242dd4c4c6030",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dvl3hqoba/image/upload/v1675872143/YelpCamp/wxaswb8c2jhfkfy3d95g.jpg",
          filename: "YelpCamp/wxaswb8c2jhfkfy3d95g",
          _id: "63e3c78f87d9d3146aa936d9",
        },
        {
          url: "https://res.cloudinary.com/dvl3hqoba/image/upload/v1675889013/YelpCamp/xsefbopyiibdzmxj5xvu.jpg",
          filename: "YelpCamp/xsefbopyiibdzmxj5xvu.jpg",
          _id: "63e3c78f87d9d3146aa936d9",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
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
