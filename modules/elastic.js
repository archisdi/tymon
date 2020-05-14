"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstance = exports.initialize = void 0;
const elasticsearch = require("elasticsearch");
let instance;
exports.initialize = ({ connection_string }) => {
    if (!instance) {
        instance = new elasticsearch.Client({
            hosts: [String(connection_string)]
        });
    }
};
exports.getInstance = () => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
};
exports.default = {
    initialize: exports.initialize,
    getInstance: exports.getInstance
};
