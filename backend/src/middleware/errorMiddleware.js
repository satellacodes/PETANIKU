exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  const response = {
    message: err.message,
    code: err.code || 'SERVER_ERROR',
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  if (err.message.includes('Token expired')) {
    response.code = 'TOKEN_EXPIRED';
  }


  if (err.name === 'JsonWebTokenError') {
    response.code = 'AUTH_ERROR';
    response.message = 'Invalid token';
  }

  res.status(statusCode).json(response);
};


exports.uploadErrorHandler = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size too large. Max 3MB allowed",
      });
    }
    return res.status(400).json({
      message: err.message || "File upload failed",
    });
  }
  next();
};
