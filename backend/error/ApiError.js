class ApiError {
    constructor(code, message) {
        this.code = code,
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static badDecrypt(msg) {
        return new ApiError(415, msg);
    }
    
    static internal(msg) {
        return new ApiError(500, msg);
    }
}

module.exports = ApiError;