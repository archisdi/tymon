import * as elasticsearch from 'elasticsearch';
interface IElasticInput {
    connection_string: string;
}
export declare type ElasticInstance = elasticsearch.Client;
declare const _default: {
    initialize: ({ connection_string }: IElasticInput) => void;
    getInstance: () => elasticsearch.Client;
};
export default _default;
