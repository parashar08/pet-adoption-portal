class apiResponse {
  static success(
    res,
    statusCode,
    data = {},
    message = 'Operation Successfull'
  ) {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
    });
  }

  static error(res, statusCode, message = 'Something went wrong') {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

export default apiResponse;
