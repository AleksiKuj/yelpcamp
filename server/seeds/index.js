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
const imageList = [
  {
    url: "https://res.cloudinary.com/dvl3hqoba/image/upload/v1676024265/YelpCamp/ybgedgtnitpzkdakhivg.jpg",
    filename: "YelpCamp/ybgedgtnitpzkdakhivg",
    id: "",
  },
  {
    url: "https://res.cloudinary.com/dvl3hqoba/image/upload/v1676024265/YelpCamp/lszwgkp8auttgslmsdmh.jpg",
    filename: "YelpCamp/lszwgkp8auttgslmsdmh",
    id: "",
  },
  {
    url: "https://res.cloudinary.com/dvl3hqoba/image/upload/v1676024265/YelpCamp/kmcwjttpeq0am8ggcbzw.jpg",
    filename: "YelpCamp/kmcwjttpeq0am8ggcbzw",
    id: "",
  },
  {
    url: "https://res.cloudinary.com/dvl3hqoba/image/upload/v1676024265/YelpCamp/yomwjjnltczxiijsxoid.jpg",
    filename: "YelpCamp/yomwjjnltczxiijsxoid",
    id: "",
  },
  {
    url: "https://res.cloudinary.com/dvl3hqoba/image/upload/v1676024265/YelpCamp/k7yrxahvztpye5lsd6mx.jpg",
    filename: "k7yrxahvztpye5lsd6mx",
    id: "",
  },
]
const seedDB = async () => {
  await Campground.deleteMany({})
  await Review.deleteMany({})

  for (let i = 0; i < 200; i++) {
    const randomImg = Math.floor(Math.random() * imageList.length)
    const randomImg2 = Math.floor(Math.random() * imageList.length)
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      user: "63e370cb9d4242dd4c4c6030",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [imageList[randomImg], imageList[randomImg2]],
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
