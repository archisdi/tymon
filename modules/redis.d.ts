import * as Redis from 'ioredis';
interface IRedisInput {
    connection_string: string;
}
declare const _default: {
    initialize: ({ connection_string }: IRedisInput) => void;
    getInstance: () => Redis.Redis;
};
export default _default;
