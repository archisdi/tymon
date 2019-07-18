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
    constructor({ message, name, status, data }) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = name;
        this.data = data ? data : undefined;
    }
}
// tslint:disable-next-line
const HttpError = {};
const initialize = () => {
    errors.forEach((e) => {
        HttpError[e.name] = (message, name = 'WHOOPS', data) => new CustomError({
            name,
            message: `${e.message}${message ? `, ${message}` : ''}`,
            status: e.statusCode,
            data
        });
    });
};
HttpError.initialize = initialize;
exports.default = HttpError;
