import * as elasticsearch from 'elasticsearch';
interface IElasticInput {
    connection_string: string;
}
export declare type ElasticInstance = elasticsearch.Client;
export declare const initialize: ({ connection_string }: IElasticInput) => void;
export declare const getInstance: () => ElasticInstance;
declare const _default: {
    initialize: ({ connection_string }: IElasticInput) => void;
    getInstance: () => elasticsearch.Client;
};
export default _default;
