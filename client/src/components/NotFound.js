import { Link } from "react-router-dom"
import React, { useState } from "react"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"

const NotFound = () => {
  return (
    <Alert variant="danger" className="mt-5">
      <Alert.Heading>Error 404</Alert.Heading>
      <p>Page not found :3</p>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </Alert>
  )
}
export default NotFound
