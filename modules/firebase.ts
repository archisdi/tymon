import * as firebase from 'firebase-admin';
import * as path from 'path';

interface InstanceConfig {
  databaseURL?: string;
  storageBucket?: string;
  credential?: any;
}

interface FirebaseInput {
  db_url?: string;
  storage_url?: string;
  service_account_path?: string;
}

export type FirebaseInstance = firebase.app.App;

let instance: FirebaseInstance;

export const initialize = (input: FirebaseInput): void => {
  if (!instance) {
      const config: InstanceConfig = {
        databaseURL: input.db_url,
        storageBucket: input.storage_url
      };

      // load cred if passed
      if (input.service_account_path) {
        const filePath: string = path.join(__dirname, '../../..', input.service_account_path);
        const serviceAccount = require(filePath);

        const params = {
          type: ( serviceAccount as any).type,
          projectId: ( serviceAccount as any).project_id,
          privateKeyId: ( serviceAccount as any).private_key_id,
          privateKey: ( serviceAccount as any).private_key,
          clientEmail: ( serviceAccount as any).client_email,
          clientId: ( serviceAccount as any).client_id,
          authUri: ( serviceAccount as any).auth_uri,
          tokenUri: ( serviceAccount as any).token_uri,
          authProviderX509CertUrl: ( serviceAccount as any).auth_provider_x509_cert_url,
          clientC509CertUrl: ( serviceAccount as any).client_x509_cert_url
        };

        config.credential = firebase.credential.cert(params);
      }

      instance = firebase.initializeApp(config);
  }
};

export const getInstance = (): FirebaseInstance => {
  if (!instance) {
    throw new Error('Not initialize');
  }
  return instance;
};

export default {
  initialize,
  getInstance
};
