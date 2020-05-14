import { MongoClient, Db } from 'mongodb';

interface MongoInput {
    connection_string: string;
    database: string;
}

export type MongoInstance = Db;

let instance: MongoInstance;

export const initialize = async ({ connection_string, database }: MongoInput): Promise<void> => {
    if (!instance) {
        instance = await MongoClient.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => client.db(database))
        .catch((err) => {
            throw new Error(`fail initializing mongodb connection, ${err.message}`);
        });
    }
};

export const getInstance = (): MongoInstance => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};

export default {
    initialize,
    getInstance
};
