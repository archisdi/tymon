"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch = require("elasticsearch");
let instance;
const initialize = ({ connection_string }) => {
    if (!instance) {
        instance = new elasticsearch.Client({
            hosts: [String(connection_string)]
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
