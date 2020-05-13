import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, ModelType } from 'sequelize';
import { Options } from 'sequelize';
import { Transaction } from 'sequelize';

interface DBInput {
    connection_string: string;
    models_path: string;
}

interface DBModel extends ModelType {
    associate?: (models: DBModelCollection) => void
}

interface DBModelCollection { 
    [s:string]: DBModel 
}

export interface DBInstance { 
    model: DBModelCollection; 
    context: Sequelize; 
    ORMProvider: any; 
    db_transaction: Transaction | null; 
}

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


let instance: DBInstance | null ;

export const initialize = async ({ connection_string, models_path }: DBInput): Promise<void> => {
    const models: DBModelCollection = {};
    const sequelize = new Sequelize(connection_string, options);

    const modelsDir = path.join(__dirname, '../../..', models_path);
    fs.readdirSync(modelsDir)
        .filter((file) => {
            const fileExtension: string = file.slice(-3);
            const isEligible: boolean = (fileExtension === '.js' || fileExtension === '.ts');
            return (file.indexOf('.') !== 0) && isEligible;
        })
        .forEach((file) => {
            const model: DBModel = sequelize.import(path.join(modelsDir, file));
            models[model.name] = model;
        });

    Object.keys(models).forEach((modelName) => {
        const subModel = models[modelName];
        if (subModel && subModel.associate) {
            subModel.associate(models);
        }
    });

    instance = {
        ORMProvider: Sequelize,
        context: sequelize,
        model: models,
        db_transaction: null
    }
};

export const getInstance = async (): Promise<DBInstance> => {
    if (!instance) {
        throw new Error('Not initialize');
     }
    return instance;
};

export const getModel = (modelName: string): DBModel => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance.model[modelName];
}

export const startTransaction = async (): Promise<void> => {
    if (!instance) {
        throw new Error('Not initialize');
     }
    instance.db_transaction = await instance.context.transaction({
        isolationLevel: instance.ORMProvider.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    });
};

export const endTransaction = async (): Promise<void> => {
    if (instance) {
        instance.db_transaction = null;
    }
};

export const getTransaction = (): Transaction => {
    if (!instance?.db_transaction) {
        throw new Error('No transaction set')
    }
    return instance.db_transaction;
};

export const commit = async (): Promise<void> => {
    if (instance && instance.db_transaction) {
        await instance.db_transaction.commit();
        await endTransaction();
    }
};

export const rollback = async (): Promise<void> => {
    if (instance && instance.db_transaction) {
        await instance.db_transaction.rollback();
        await endTransaction();
    }
};

export const closeContext = async (): Promise<any> => {
    let result = null;

    if (instance && instance.context) {
        console.info('Closing - DBContext'); // tslint:disable-line
        result = await instance.context.close().catch((err: Error) => {
            console.error(`Error Closing DBContext: ${err.stack}`); // tslint:disable-line
        });
        console.info('Closed - DBContext'); // tslint:disable-line
    }

    instance = null;
    return result;
};

export default {
    initialize,
    getInstance,
    getModel,
    startTransaction,
    endTransaction,
    getTransaction,
    commit,
    rollback,
    closeContext
};
