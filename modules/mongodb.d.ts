import { Db } from 'mongodb';
interface MongoInput {
    connection_string: string;
    database: string;
}
export declare type MongoInstance = Db;
declare const _default: {
    initialize: ({ connection_string, database }: MongoInput) => Promise<void>;
    getInstance: () => Db;
};
export default _default;
