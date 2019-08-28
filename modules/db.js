"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
let modelsInitialized = false;
let models = null;
exports.initialize = ({ connection_string, models_path }) => __awaiter(this, void 0, void 0, function* () {
    models = {};
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
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
    models.ORMProvider = sequelize_1.Sequelize;
    models.context = sequelize;
    modelsInitialized = true;
});
exports.getInstance = () => __awaiter(this, void 0, void 0, function* () {
    if (!modelsInitialized) {
        throw new Error('Not initialize');
    }
    return models;
});
exports.startTransaction = () => __awaiter(this, void 0, void 0, function* () {
    if (!modelsInitialized) {
        throw new Error('Not initialize');
    }
    models.db_transaction = yield models.context.transaction({
        isolationLevel: models.ORMProvider.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    });
});
exports.endTransaction = () => __awaiter(this, void 0, void 0, function* () {
    models.db_transaction = null;
});
exports.getTransaction = () => models.db_transaction;
exports.commit = () => __awaiter(this, void 0, void 0, function* () {
    if (models && models.db_transaction) {
        yield models.db_transaction.commit();
        yield exports.endTransaction();
    }
});
exports.rollback = () => __awaiter(this, void 0, void 0, function* () {
    if (models && models.db_transaction) {
        yield models.db_transaction.rollback();
        yield exports.endTransaction();
    }
});
exports.closeContext = () => __awaiter(this, void 0, void 0, function* () {
    let result = null;
    if (models && models.context) {
        console.info('Closing - DBContext'); // tslint:disable-line
        result = yield models.context.close().catch((err) => {
            console.error(`Error Closing DBContext: ${err.stack}`); // tslint:disable-line
        });
        console.info('Closed - DBContext'); // tslint:disable-line
    }
    models = null;
    modelsInitialized = false;
    return result;
});
exports.default = {
    initialize: exports.initialize,
    getInstance: exports.getInstance,
    startTransaction: exports.startTransaction,
    endTransaction: exports.endTransaction,
    getTransaction: exports.getTransaction,
    commit: exports.commit,
    rollback: exports.rollback,
    closeContext: exports.closeContext
};
