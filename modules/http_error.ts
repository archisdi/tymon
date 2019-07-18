import * as Err from 'http-status-codes';

interface IError {
    name: string;
    statusCode: number;
    message: string;
}

interface IErrorDetail {
    type: string;
    data?: object | null;
    desc?: string;
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
    public status: number;
    public message: string;
    public detail: object | null;

    constructor(message: string, detail: IErrorDetail | null, status: number) {
        super(message);
        this.message = message;
        this.status = status;
        this.detail = detail;
    }
}

// tslint:disable-next-line
const HttpError: any = {};

const initialize = () => {
    errors.forEach((e: IError) => {
        HttpError[e.name] = (errDetail: string | IErrorDetail | null) => {
            if (errDetail instanceof Object) {
                return new CustomError(e.message, errDetail, e.statusCode);
            } else {
                const message: string = String(errDetail || 'WHOOPS');
                return new CustomError(e.message, { type: message }, e.statusCode);
            }
        };
    });
};

HttpError.initialize = initialize;

export default HttpError;
