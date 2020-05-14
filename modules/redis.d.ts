import * as Redis from 'ioredis';
interface IRedisInput {
    connection_string: string;
}
export declare type RedisInstance = Redis.Redis;
export declare const initialize: ({ connection_string }: IRedisInput) => void;
export declare const getInstance: () => RedisInstance;
declare const _default: {
    initialize: ({ connection_string }: IRedisInput) => void;
    getInstance: () => Redis.Redis;
};
export default _default;
