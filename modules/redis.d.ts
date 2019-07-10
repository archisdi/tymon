interface IRedisInput {
    host: string;
    port: number;
}
declare const _default: {
    initialize: (input: IRedisInput) => void;
    getInstance: () => any;
};
export default _default;
