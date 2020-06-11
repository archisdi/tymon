import * as elasticsearch from 'elasticsearch';

interface IElasticOpts {
    connection_string: string;
}

export type ElasticInstance =  elasticsearch.Client;

export class ElasticsearchModule {
    public static instance: ElasticInstance;

    public static initialize({ connection_string }: IElasticOpts): void {
        if (!this.instance) {
            this.instance = new elasticsearch.Client({
                hosts: [String(connection_string)]
            });
        }
    }
    
    public static getInstance(): ElasticInstance {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance;
    }
}

export default ElasticsearchModule;
