import { Db } from 'mongodb';
interface IMongoInput {
    connection_string: string;
    database: string;
}
declare const _default: {
    initialize: ({ connection_string, database }: IMongoInput) => Promise<void>;
    getInstance: () => Db;
};
export default _default;
