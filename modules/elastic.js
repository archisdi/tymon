"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch = require("elasticsearch");
let instance;
const initialize = (input) => {
    if (!instance) {
        instance = new elasticsearch.Client({
            hosts: [
                `${input.protocol}://${input.username}:${input.password}@${input.host}:${input.port}/`
            ]
        });
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
