"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
let instance;
const initialize = ({ connection_string, database }) => {
    if (!instance) {
        instance = mongodb_1.MongoClient.connect(connection_string)
            .then((client) => client.db(database))
            .catch((err) => {
            throw new Error(`fail initializing mongodb connection, ${err.message}`);
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
