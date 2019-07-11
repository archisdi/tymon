import * as Redis from 'ioredis';

interface IRedisInput {
    connection_string: string;
}

let instance: any;

const initialize = ({ connection_string }: IRedisInput): void => {
    if (!instance) {
        instance = new Redis(connection_string);
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
