import * as redis from 'redis';
import { promisifyAll } from 'bluebird';

promisifyAll(redis);

interface IRedisInput {
    host: string;
    port: number;
}

let instance: any;

const initialize = (input: IRedisInput): void => {
    if (!instance) {
        instance = redis.createClient(Number(input.port), String(input.host));
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
