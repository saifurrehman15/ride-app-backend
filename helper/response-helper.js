export default function sendResponse(res, status, message, data, error) {
  return res.status(status).json({
    error,
    message,
    data,
  });
}
