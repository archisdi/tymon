import * as elasticsearch from 'elasticsearch';

interface IElasticInput {
    connection_string: string;
}

let instance: any;

const initialize = ({ connection_string }: IElasticInput): void => {
    if (!instance) {
        instance = new elasticsearch.Client({
            hosts: [String(connection_string)]
        });
    }
};

const getInstance = (): any => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};

export default {
    initialize,
    getInstance
};
