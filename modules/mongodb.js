"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
let instance;
const initialize = ({ connection_string, database }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instance) {
        instance = yield mongodb_1.MongoClient.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((client) => client.db(database))
            .catch((err) => {
            throw new Error(`fail initializing mongodb connection, ${err.message}`);
        });
    }
});
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
