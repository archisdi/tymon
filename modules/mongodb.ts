import { MongoClient } from 'mongodb';

interface IMongoInput {
    connection_string: string;
    database: string;
}

let instance: any;

const initialize = ({ connection_string, database }: IMongoInput): void => {
    if (!instance) {
        instance = MongoClient.connect(connection_string)
        .then((client) => client.db(database))
        .catch((err) => {
            throw new Error(`fail initializing mongodb connection, ${err.message}`);
        });
    }
};

const getInstance = (): any => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};

export default {
    initialize,
    getInstance
};
