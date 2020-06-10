import { Sequelize, ModelType } from 'sequelize';
import { Transaction } from 'sequelize';
interface DBInput {
    connection_string: string;
    models_path: string;
}
interface DBModel extends ModelType {
    associate?: (models: DBModelCollection) => void;
}
interface DBModelCollection {
    [s: string]: DBModel;
}
export interface DBInstance {
    model: DBModelCollection;
    context: Sequelize;
    ORMProvider: any;
    db_transaction: Transaction | null;
}
export declare const initialize: ({ connection_string, models_path }: DBInput) => Promise<void>;
export declare const getInstance: () => DBInstance;
export declare const getModel: (modelName: string) => DBModel;
export declare const startTransaction: () => Promise<void>;
export declare const endTransaction: () => Promise<void>;
export declare const getTransaction: () => Transaction | undefined;
export declare const commit: () => Promise<void>;
export declare const rollback: () => Promise<void>;
export declare const closeContext: () => Promise<void>;
declare const _default: {
    initialize: ({ connection_string, models_path }: DBInput) => Promise<void>;
    getInstance: () => DBInstance;
    getModel: (modelName: string) => DBModel;
    startTransaction: () => Promise<void>;
    endTransaction: () => Promise<void>;
    getTransaction: () => Transaction | undefined;
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
    closeContext: () => Promise<void>;
};
export default _default;
