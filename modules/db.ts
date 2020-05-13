import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, ModelType } from 'sequelize';
import { Options } from 'sequelize';
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

interface sequelizeModel extends ModelType {
    associate?: (models: ModelCollection) => void
}

interface ModelCollection { 
    [s:string]: sequelizeModel 
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


let instance: InstanceType | null ;

export const initialize = async ({ connection_string, models_path }: IDbInput): Promise<void> => {
    const models: ModelCollection = {};
    const sequelize = new Sequelize(connection_string, options);

    const modelsDir = path.join(__dirname, '../../..', models_path);
    fs.readdirSync(modelsDir)
        .filter((file) => {
            const fileExtension: string = file.slice(-3);
            const isEligible: boolean = (fileExtension === '.js' || fileExtension === '.ts');
            return (file.indexOf('.') !== 0) && isEligible;
        })
        .forEach((file) => {
            const model: sequelizeModel = sequelize.import(path.join(modelsDir, file));
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

export const getInstance = async (): Promise<any> => {
    if (!instance) {
        throw new Error('Not initialize');
     }
    return instance;
};

export const getModel = (modelName: string): ModelType => {
    return instance?.model[modelName];
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

export const getTransaction = (): any => {
    if (!instance) {
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
