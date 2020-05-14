interface ICustomError {
    message: string;
    name: string;
    http_status: number;
    code?: string;
    data?: any;
}
export declare class HttpError extends Error {
    message: string;
    httpStatus: number;
    name: string;
    code: string;
    data: any;
    constructor({ message, name, http_status, data, code }: ICustomError);
}
export declare const BadRequestError: (message: string, code?: string | undefined) => HttpError;
export declare const UnauthorizedError: (message: string, code?: string | undefined) => HttpError;
export declare const ForbiddenError: (message: string, code?: string | undefined) => HttpError;
export declare const NotFoundError: (message: string, code?: string | undefined) => HttpError;
export declare const UnprocessableEntityError: (message: string, code?: string | undefined) => HttpError;
export declare const TooManyRequestsError: (message: string, code?: string | undefined) => HttpError;
export declare const InternalServerError: (message: string, code?: string | undefined) => HttpError;
declare const _default: {
    HttpError: typeof HttpError;
    BadRequestError: (message: string, code?: string | undefined) => HttpError;
    UnauthorizedError: (message: string, code?: string | undefined) => HttpError;
    ForbiddenError: (message: string, code?: string | undefined) => HttpError;
    NotFoundError: (message: string, code?: string | undefined) => HttpError;
    UnprocessableEntityError: (message: string, code?: string | undefined) => HttpError;
    TooManyRequestsError: (message: string, code?: string | undefined) => HttpError;
    InternalServerError: (message: string, code?: string | undefined) => HttpError;
};
export default _default;
