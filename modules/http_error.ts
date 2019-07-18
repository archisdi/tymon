import * as Err from 'http-status-codes';

interface IHttpError {
    name: string;
    statusCode: number;
    message: string;
}

interface ICustomError {
    message: string;
    name: string;
    status: number;
    data?: object | null | undefined;
}

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
    public message: string;
    public status: number;
    public name: string;
    public data: object | undefined;

    constructor({ message, name, status, data }: ICustomError) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = name;
        this.data = data ? data : undefined;
    }
}

// tslint:disable-next-line
const HttpError: any = {};

const initialize = () => {
    errors.forEach((e: IHttpError) => {
        HttpError[e.name] = (message: string, name: string = 'WHOOPS', data: object) =>
            new CustomError({
                name,
                message: `${e.message}${message ? `, ${message}` : ''}`,
                status: e.statusCode,
                data
            });
    });
};

HttpError.initialize = initialize;

export default HttpError;
