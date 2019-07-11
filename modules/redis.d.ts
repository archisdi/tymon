interface IRedisInput {
    connection_string: string;
}
declare const _default: {
    initialize: ({ connection_string }: IRedisInput) => void;
    getInstance: () => any;
};
export default _default;
