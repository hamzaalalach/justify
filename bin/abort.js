module.exports = {
  notFound: res => {
    return res.status(404).json({
      success: false,
      error: 404,
      message: 'Not Found'
    });
  }
};
