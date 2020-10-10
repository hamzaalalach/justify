module.exports = {
  notFound: res => {
    return res.status(404).json({
      success: false,
      error: 404,
      message: 'Not Found'
    });
  },
  badRequest: res => {
    return res.status(400).json({
      success: false,
      error: 400,
      message: 'Bad Request'
    });
  },
  internalServer: (res, message) => {
    return res.status(500).json({
      success: false,
      error: 500,
      message
    });
  },
  unauthorized: (res, message) => {
    return res.status(401).json({
      success: false,
      error: 401,
      message
    });
  },
  paymentRequired: res => {
    return res.status(402).json({
      success: false,
      error: 402,
      message: 'Qota limit reached, payment required'
    });
  }
};
