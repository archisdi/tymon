import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';
import { Options } from 'sequelize';

interface IDbInput {
    connection_string: string;
    models_path: string;
}

type instance = any | null;

const options: Options = {
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'production' ? false : console.log, // tslint:disable-line
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 20000
    }
};

const basename: string = path.basename(__filename);
let modelsInitialized: boolean = false;
let models: instance = null;

export const initialize = async ({ connection_string, models_path }: IDbInput): Promise<void> => {
    models = {};
    const sequelize = new Sequelize(connection_string, options);

    const modelsDir = path.join(__dirname, '../../..', models_path);
    fs.readdirSync(modelsDir)
        .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach((file) => {
            const model = sequelize.import(path.join(modelsDir, file));
            models[model.name] = model;
        });

    Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });

    models.ORMProvider = Sequelize;
    models.context = sequelize;
    modelsInitialized = true;
};

export const getInstance = async (): Promise<instance> => {
    if (!modelsInitialized) {
        throw new Error('Not initialize');
     }
    return models;
};

export const startTransaction = async (): Promise<void> => {
    if (!modelsInitialized) {
        throw new Error('Not initialize');
     }
    models.db_transaction = await models.context.transaction({
        isolationLevel: models.ORMProvider.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    });
};

export const endTransaction = async (): Promise<void> => {
    models.db_transaction = null;
};

export const getTransaction = (): any => models.db_transaction;

export const commit = async (): Promise<void> => {
    if (models && models.db_transaction) {
        await models.db_transaction.commit();
        endTransaction();
    }
};

export const rollback = async (): Promise<void> => {
    if (models && models.db_transaction) {
        await models.db_transaction.rollback();
        endTransaction();
    }
};

export const closeContext = async (): Promise<any> => {
    let result = null;

    if (models && models.context) {
        console.info('Closing - DBContext'); // tslint:disable-line
        result = await models.context.close().catch((err: Error) => {
            console.error(`Error Closing DBContext: ${err.stack}`); // tslint:disable-line
        });
        console.info('Closed - DBContext'); // tslint:disable-line
    }

    models = null;
    modelsInitialized = false;
    return result;
};

export default {
    initialize,
    getInstance,
    startTransaction,
    endTransaction,
    getTransaction,
    commit,
    rollback,
    closeContext
};
