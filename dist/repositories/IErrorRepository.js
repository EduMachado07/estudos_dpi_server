"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflict = exports.NotFound = exports.Unauthorized = exports.ZodValidationError = exports.BadRequest = exports.IError = void 0;
class IError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.IError = IError;
class BadRequest extends IError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
class ZodValidationError extends IError {
    details;
    constructor(zodError) {
        super("Dados de entrada inválidos", 400);
        this.details = zodError.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
    }
}
exports.ZodValidationError = ZodValidationError;
class Unauthorized extends IError {
    constructor(message) {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
class NotFound extends IError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFound = NotFound;
class Conflict extends IError {
    constructor(message) {
        super(message, 409);
    }
}
exports.Conflict = Conflict;
