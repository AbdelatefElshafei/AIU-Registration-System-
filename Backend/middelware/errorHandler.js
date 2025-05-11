const errorHandler = (err, req, res, next) => {
      console.error(err.stack);
    
      
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Validation Error',
          errors: Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message
          }))
        });
      }
    
      if (err.code === 11000) {
        return res.status(400).json({
          message: 'Duplicate key error',
          field: Object.keys(err.keyValue)[0],
          value: Object.values(err.keyValue)[0]
        });
      }
    
      
      if (err.name === 'CastError') {
        return res.status(400).json({
          message: 'Invalid ID format',
          field: err.path,
          value: err.value
        });
      }
    
     
      res.status(500).json({
        message: 'Something went wrong',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    };
    
    module.exports = errorHandler; 