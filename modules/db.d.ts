interface IDbInput {
    connection_string: string;
    models_path: string;
}
export declare const initialize: ({ connection_string, models_path }: IDbInput) => Promise<void>;
export declare const getInstance: () => Promise<any>;
export declare const startTransaction: () => Promise<void>;
export declare const endTransaction: () => Promise<void>;
export declare const getTransaction: () => any;
export declare const commit: () => Promise<void>;
export declare const rollback: () => Promise<void>;
export declare const closeContext: () => Promise<any>;
declare const _default: {
    initialize: ({ connection_string, models_path }: IDbInput) => Promise<void>;
    getInstance: () => Promise<any>;
    startTransaction: () => Promise<void>;
    endTransaction: () => Promise<void>;
    getTransaction: () => any;
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
    closeContext: () => Promise<any>;
};
export default _default;
