import * as elasticsearch from 'elasticsearch';
interface IElasticOpts {
    connection_string: string;
}
export declare type ElasticInstance = elasticsearch.Client;
export declare class ElasticsearchModule {
    static instance: ElasticInstance;
    static initialize({ connection_string }: IElasticOpts): void;
    static getInstance(): ElasticInstance;
}
export default ElasticsearchModule;
