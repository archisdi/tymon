import * as elasticsearch from 'elasticsearch';

interface IElasticInput {
    protocol: string,
    username: string,
    password: string,
    host: string;
    port: number;
}

let instance: any;

const initialize = (input: IElasticInput): void => {
    if (!instance) {
        instance = new elasticsearch.Client({
            hosts: [
                `${input.protocol}://${input.username}:${input.password}@${input.host}:${input.port}/`
            ]
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
