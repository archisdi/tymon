import { MongoClient, Db } from 'mongodb';

interface IMongoInput {
    connection_string: string;
    database: string;
}

let instance: Db;

const initialize = async ({ connection_string, database }: IMongoInput): Promise<void> => {
    if (!instance) {
        instance = await MongoClient.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => client.db(database))
        .catch((err) => {
            throw new Error(`fail initializing mongodb connection, ${err.message}`);
        });
    }
};

const getInstance = (): Db => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};

export default {
    initialize,
    getInstance
};
