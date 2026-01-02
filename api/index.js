export default function handler(req, res) {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource could not be found."
  });
}