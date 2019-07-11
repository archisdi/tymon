"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
let instance;
const initialize = ({ connection_string }) => {
    if (!instance) {
        instance = new Redis(connection_string);
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
