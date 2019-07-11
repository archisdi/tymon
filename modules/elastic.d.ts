interface IElasticInput {
    connection_string: string;
}
declare const _default: {
    initialize: ({ connection_string }: IElasticInput) => void;
    getInstance: () => any;
};
export default _default;
