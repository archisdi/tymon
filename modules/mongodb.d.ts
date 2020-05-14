import { Db } from 'mongodb';
interface MongoInput {
    connection_string: string;
    database: string;
}
export declare type MongoInstance = Db;
export declare const initialize: ({ connection_string, database }: MongoInput) => Promise<void>;
export declare const getInstance: () => MongoInstance;
declare const _default: {
    initialize: ({ connection_string, database }: MongoInput) => Promise<void>;
    getInstance: () => Db;
};
export default _default;
