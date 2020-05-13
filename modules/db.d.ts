import { Sequelize, ModelType } from 'sequelize';
import { Transaction } from 'sequelize';
interface IDbInput {
    connection_string: string;
    models_path: string;
}
interface InstanceType {
    model: any;
    context: Sequelize;
    ORMProvider: any;
    db_transaction: Transaction | null;
}
export declare const initialize: ({ connection_string, models_path }: IDbInput) => Promise<void>;
export declare const getInstance: () => Promise<InstanceType>;
export declare const getModel: (modelName: string) => ModelType;
export declare const startTransaction: () => Promise<void>;
export declare const endTransaction: () => Promise<void>;
export declare const getTransaction: () => Transaction;
export declare const commit: () => Promise<void>;
export declare const rollback: () => Promise<void>;
export declare const closeContext: () => Promise<any>;
declare const _default: {
    initialize: ({ connection_string, models_path }: IDbInput) => Promise<void>;
    getInstance: () => Promise<InstanceType>;
    getModel: (modelName: string) => typeof import("sequelize/types").Model;
    startTransaction: () => Promise<void>;
    endTransaction: () => Promise<void>;
    getTransaction: () => Transaction;
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
    closeContext: () => Promise<any>;
};
export default _default;
