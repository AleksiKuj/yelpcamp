import Alert from "react-bootstrap/Alert"

const Notification = ({ variant, message }) => {
  const style = { display: message.length > 0 ? "block" : "none" }
  return (
    <div className="mt-5 text-center" style={style}>
      <Alert key={variant} variant={variant}>
        {message}
      </Alert>
    </div>
  )
}

export default Notification
