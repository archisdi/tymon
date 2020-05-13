import * as StatusCode from 'http-status-codes';

interface IHttpError {
    name: string;
    statusCode: number;
    message: string;
}

interface ICustomError {
    message: string;
    name: string;
    http_status: number;
    code?: string;
    data?: any;
}

export class HttpError extends Error {
    public message: string;
    public httpStatus: number;
    public name: string;
    public code: string;
    public data: any;

    constructor({ message, name, http_status, data, code }: ICustomError) {
        super(message);
        this.message = message;
        this.httpStatus = http_status;
        this.name = name;
        this.code = code ? code : String(http_status)
        this.data = data ? data : undefined;
    }
}

export const BadRequestError = (message: string, code?: string): HttpError => {
    return new HttpError({
        name: 'BadRequest',
        message, 
        http_status: StatusCode.BAD_REQUEST,
        code
    })
}

export const UnauthorizedError = (message: string, code?: string): HttpError => {
    return new HttpError({
        name: 'Unauthorized',
        message,
        http_status: StatusCode.UNAUTHORIZED,
        code
    })
}

export const ForbiddenError = (message: string, code?: string): HttpError => {
    return new HttpError({
        name: 'Forbidden',
        message,
        http_status: StatusCode.FORBIDDEN,
        code
    })
}

export const NotFoundError = (message: string, code?: string): HttpError => {
    return new HttpError({
        name: 'NotFound',
        message,
        http_status: StatusCode.NOT_FOUND,
        code
    })
}

export const UnprocessableEntityError = (message: string, code?: string): HttpError => {
    return new HttpError({
        name: 'UnprocessableEntity',
        message,
        http_status: StatusCode.UNPROCESSABLE_ENTITY,
        code
    })
}

export const TooManyRequestsError = (message: string, code?: string): HttpError => {
    return new HttpError({
        name: 'TooManyRequests',
        message,
        http_status: StatusCode.TOO_MANY_REQUESTS,
        code
    })
}

export const InternalServerError = (message: string, code?: string): HttpError => {
    return new HttpError({
        name: 'InternalServerError',
        message,
        http_status: StatusCode.INTERNAL_SERVER_ERROR,
        code
    })
}

export default {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    UnprocessableEntityError,
    TooManyRequestsError,
    InternalServerError
};
