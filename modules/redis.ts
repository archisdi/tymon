import * as Redis from 'ioredis';

interface IRedisInput {
    connection_string: string;
}

export type RedisInstance = Redis.Redis;

let instance: RedisInstance;

export const initialize = ({ connection_string }: IRedisInput): void => {
    if (!instance) {
        instance = new Redis(connection_string);
    }
};

export const getInstance = (): RedisInstance => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};

export default {
    initialize,
    getInstance
};
