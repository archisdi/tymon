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
exports.closeContext = exports.rollback = exports.commit = exports.getTransaction = exports.endTransaction = exports.startTransaction = exports.getModel = exports.getInstance = exports.initialize = void 0;
const fs = require("fs");
const path = require("path");
const sequelize_1 = require("sequelize");
const options = {
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 20000
    }
};
let instance;
exports.initialize = ({ connection_string, models_path }) => __awaiter(void 0, void 0, void 0, function* () {
    const models = {};
    const sequelize = new sequelize_1.Sequelize(connection_string, options);
    const modelsDir = path.join(__dirname, '../../..', models_path);
    fs.readdirSync(modelsDir)
        .filter((file) => {
        const fileExtension = file.slice(-3);
        const isEligible = (fileExtension === '.js' || fileExtension === '.ts');
        return (file.indexOf('.') !== 0) && isEligible;
    })
        .forEach((file) => {
        const model = sequelize.import(path.join(modelsDir, file));
        models[model.name] = model;
    });
    Object.keys(models).forEach((modelName) => {
        const subModel = models[modelName];
        if (subModel && subModel.associate) {
            subModel.associate(models);
        }
    });
    instance = {
        ORMProvider: sequelize_1.Sequelize,
        context: sequelize,
        model: models,
        db_transaction: null
    };
});
exports.getInstance = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance;
});
exports.getModel = (modelName) => {
    if (!instance) {
        throw new Error('Not initialize');
    }
    return instance.model[modelName];
};
exports.startTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!instance) {
        throw new Error('Not initialize');
    }
    instance.db_transaction = yield instance.context.transaction({
        isolationLevel: instance.ORMProvider.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    });
});
exports.endTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    if (instance) {
        instance.db_transaction = null;
    }
});
exports.getTransaction = () => {
    return (instance === null || instance === void 0 ? void 0 : instance.db_transaction) ? instance === null || instance === void 0 ? void 0 : instance.db_transaction : undefined;
};
exports.commit = () => __awaiter(void 0, void 0, void 0, function* () {
    if (instance && instance.db_transaction) {
        yield instance.db_transaction.commit();
        yield exports.endTransaction();
    }
});
exports.rollback = () => __awaiter(void 0, void 0, void 0, function* () {
    if (instance && instance.db_transaction) {
        yield instance.db_transaction.rollback();
        yield exports.endTransaction();
    }
});
exports.closeContext = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (instance && instance.context) {
        console.info('Closing - DBContext'); // tslint:disable-line
        result = yield instance.context.close().catch((err) => {
            console.error(`Error Closing DBContext: ${err.stack}`); // tslint:disable-line
        });
        console.info('Closed - DBContext'); // tslint:disable-line
    }
    instance = null;
});
exports.default = {
    initialize: exports.initialize,
    getInstance: exports.getInstance,
    getModel: exports.getModel,
    startTransaction: exports.startTransaction,
    endTransaction: exports.endTransaction,
    getTransaction: exports.getTransaction,
    commit: exports.commit,
    rollback: exports.rollback,
    closeContext: exports.closeContext
};
