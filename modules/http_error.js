"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCode = require("http-status-codes");
class HttpError extends Error {
    constructor({ message, name, http_status, data, code }) {
        super(message);
        this.message = message;
        this.httpStatus = http_status;
        this.name = name;
        this.code = code ? code : String(http_status);
        this.data = data ? data : undefined;
    }
}
exports.HttpError = HttpError;
exports.BadRequestError = (message, code) => {
    return new HttpError({
        name: 'BadRequest',
        message,
        http_status: StatusCode.BAD_REQUEST,
        code
    });
};
exports.UnauthorizedError = (message, code) => {
    return new HttpError({
        name: 'Unauthorized',
        message,
        http_status: StatusCode.UNAUTHORIZED,
        code
    });
};
exports.ForbiddenError = (message, code) => {
    return new HttpError({
        name: 'Forbidden',
        message,
        http_status: StatusCode.FORBIDDEN,
        code
    });
};
exports.NotFoundError = (message, code) => {
    return new HttpError({
        name: 'NotFound',
        message,
        http_status: StatusCode.NOT_FOUND,
        code
    });
};
exports.UnprocessableEntityError = (message, code) => {
    return new HttpError({
        name: 'UnprocessableEntity',
        message,
        http_status: StatusCode.UNPROCESSABLE_ENTITY,
        code
    });
};
exports.TooManyRequestsError = (message, code) => {
    return new HttpError({
        name: 'TooManyRequests',
        message,
        http_status: StatusCode.TOO_MANY_REQUESTS,
        code
    });
};
exports.InternalServerError = (message, code) => {
    return new HttpError({
        name: 'InternalServerError',
        message,
        http_status: StatusCode.INTERNAL_SERVER_ERROR,
        code
    });
};
exports.default = {
    HttpError,
    BadRequestError: exports.BadRequestError,
    UnauthorizedError: exports.UnauthorizedError,
    ForbiddenError: exports.ForbiddenError,
    NotFoundError: exports.NotFoundError,
    UnprocessableEntityError: exports.UnprocessableEntityError,
    TooManyRequestsError: exports.TooManyRequestsError,
    InternalServerError: exports.InternalServerError
};
