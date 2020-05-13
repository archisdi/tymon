import * as Redis from 'ioredis';

interface IRedisInput {
    connection_string: string;
}

let instance: Redis.Redis;

const initialize = ({ connection_string }: IRedisInput): void => {
    if (!instance) {
        instance = new Redis(connection_string);
    }
};

const getInstance = (): Redis.Redis => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};

export default {
    initialize,
    getInstance
};
