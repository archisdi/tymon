"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.TooManyRequestsError = exports.UnprocessableEntityError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = void 0;
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
const BadRequestError = (message, code) => {
    return new HttpError({
        name: 'BadRequest',
        message,
        http_status: StatusCode.BAD_REQUEST,
        code
    });
};
exports.BadRequestError = BadRequestError;
const UnauthorizedError = (message, code) => {
    return new HttpError({
        name: 'Unauthorized',
        message,
        http_status: StatusCode.UNAUTHORIZED,
        code
    });
};
exports.UnauthorizedError = UnauthorizedError;
const ForbiddenError = (message, code) => {
    return new HttpError({
        name: 'Forbidden',
        message,
        http_status: StatusCode.FORBIDDEN,
        code
    });
};
exports.ForbiddenError = ForbiddenError;
const NotFoundError = (message, code) => {
    return new HttpError({
        name: 'NotFound',
        message,
        http_status: StatusCode.NOT_FOUND,
        code
    });
};
exports.NotFoundError = NotFoundError;
const UnprocessableEntityError = (message, code) => {
    return new HttpError({
        name: 'UnprocessableEntity',
        message,
        http_status: StatusCode.UNPROCESSABLE_ENTITY,
        code
    });
};
exports.UnprocessableEntityError = UnprocessableEntityError;
const TooManyRequestsError = (message, code) => {
    return new HttpError({
        name: 'TooManyRequests',
        message,
        http_status: StatusCode.TOO_MANY_REQUESTS,
        code
    });
};
exports.TooManyRequestsError = TooManyRequestsError;
const InternalServerError = (message, code) => {
    return new HttpError({
        name: 'InternalServerError',
        message,
        http_status: StatusCode.INTERNAL_SERVER_ERROR,
        code
    });
};
exports.InternalServerError = InternalServerError;
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
