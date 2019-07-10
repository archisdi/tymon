"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Err = require("http-status-codes");
const errors = [
    { name: 'BadRequest', statusCode: Err.BAD_REQUEST, message: 'Bad Request' },
    { name: 'NotAuthorized', statusCode: Err.UNAUTHORIZED, message: 'Not Authorized' },
    { name: 'Forbidden', statusCode: Err.FORBIDDEN, message: 'Forbidden' },
    { name: 'NotFound', statusCode: Err.NOT_FOUND, message: 'Not Found' },
    { name: 'UnprocessableEntity', statusCode: Err.UNPROCESSABLE_ENTITY, message: 'Unprocessable Entity' },
    { name: 'TooManyRequests', statusCode: Err.TOO_MANY_REQUESTS, message: 'Too Many Requests' },
    { name: 'InternalServerError', statusCode: Err.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' }
];
class CustomError extends Error {
    constructor(message, detail, status) {
        super(message);
        this.message = message;
        this.status = status;
        this.detail = detail;
    }
}
// tslint:disable-next-line
const HttpError = {};
const initialize = () => {
    errors.forEach((e) => {
        HttpError[e.name] = (userMessage) => new CustomError(e.message, userMessage, e.statusCode);
    });
};
HttpError.initialize = initialize;
exports.default = HttpError;
