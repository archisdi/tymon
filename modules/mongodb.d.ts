interface IMongoInput {
    connection_string: string;
    database: string;
}
declare const _default: {
    initialize: ({ connection_string, database }: IMongoInput) => void;
    getInstance: () => any;
};
export default _default;
