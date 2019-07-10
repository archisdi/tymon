interface IElasticInput {
    protocol: string;
    username: string;
    password: string;
    host: string;
    port: number;
}
declare const _default: {
    initialize: (input: IElasticInput) => void;
    getInstance: () => any;
};
export default _default;
