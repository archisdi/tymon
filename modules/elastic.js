"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchModule = void 0;
const elasticsearch = require("elasticsearch");
class ElasticsearchModule {
    static initialize({ connection_string }) {
        if (!this.instance) {
            this.instance = new elasticsearch.Client({
                hosts: [String(connection_string)]
            });
        }
    }
    static getInstance() {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance;
    }
}
exports.ElasticsearchModule = ElasticsearchModule;
exports.default = ElasticsearchModule;
