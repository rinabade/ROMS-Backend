class BaseError extends Error {
    constructor (message,name, statusCode) {
    super(message)
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this)
    }
   }
   
export default BaseError