const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  switch (error.name) {
    case "ValidationError":
      return res.status(400).json({ error: error.message })
    case "NotFoundError":
      return res.status(404).json({ error: error.message })
    case "UnauthorizedError":
      return res.status(401).json({ error: error.message })
    case "JsonWebTokenError":
      return res.status(400).json({ error: "token missing or invalid" })
    default:
      return res.status(500).json({ error: error.message })
  }
}
module.exports = { errorHandler }
