import * as Sequelize from 'sequelize';
import { Transaction } from 'sequelize';
interface DBInput {
    connection_string: string;
    models_path: string;
}
interface DBModel extends Sequelize.ModelType {
    associate?: (models: DBModelCollection) => void;
}
interface DBModelCollection {
    [s: string]: DBModel;
}
export interface DBInstance {
    model: DBModelCollection;
    context: Sequelize.Sequelize;
    ORMProvider: typeof Sequelize;
    db_transaction: Transaction | null;
}
export declare class DBModule {
    static instance: DBInstance;
    static initialize({ connection_string, models_path }: DBInput): Promise<void>;
    static getInstance(): DBInstance;
    static getModel(modelName: string): DBModel;
    static startTransaction(): Promise<void>;
    static endTransaction(): Promise<void>;
    static getTransaction(): Transaction | undefined;
    static commit(): Promise<void>;
    static rollback(): Promise<void>;
}
export default DBModule;
