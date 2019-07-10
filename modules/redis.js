"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const bluebird_1 = require("bluebird");
bluebird_1.promisifyAll(redis);
let instance;
const initialize = (input) => {
    if (!instance) {
        instance = redis.createClient(Number(input.port), String(input.host));
    }
};
const getInstance = () => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};
exports.default = {
    initialize,
    getInstance
};
