"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase-admin");
const path = require("path");
let instance;
const initialize = (input) => {
    if (!instance) {
        const config = {
            databaseURL: input.db_url,
            storageBucket: input.storage_url
        };
        // load cred if passed
        if (input.service_account_path) {
            const filePath = path.join(__dirname, '../../..', input.service_account_path);
            const serviceAccount = require(filePath);
            const params = {
                type: serviceAccount.type,
                projectId: serviceAccount.project_id,
                privateKeyId: serviceAccount.private_key_id,
                privateKey: serviceAccount.private_key,
                clientEmail: serviceAccount.client_email,
                clientId: serviceAccount.client_id,
                authUri: serviceAccount.auth_uri,
                tokenUri: serviceAccount.token_uri,
                authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
                clientC509CertUrl: serviceAccount.client_x509_cert_url
            };
            config.credential = firebase.credential.cert(params);
        }
        instance = firebase.initializeApp(config);
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
