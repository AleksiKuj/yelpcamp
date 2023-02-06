require("dotenv").config()

let MONGODB_URI = process.env.MONGODB_URL

module.exports = {
  MONGODB_URI,
}
