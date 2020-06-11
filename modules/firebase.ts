import * as firebase from 'firebase-admin';
import * as path from 'path';

interface InstanceConfig {
  databaseURL?: string;
  storageBucket?: string;
  credential?: firebase.credential.Credential;
}

interface FirebaseOpts {
  db_url?: string;
  storage_url?: string;
  service_account_path?: string;
}

export type FirebaseInstance = firebase.app.App;

export class FirebaseModule {
  public static instance: FirebaseInstance;

  public static initialize(input: FirebaseOpts): void {
      if (!this.instance) {
          const config: InstanceConfig = {
              databaseURL: input.db_url,
              storageBucket: input.storage_url
          };

          // load cred if passed
          if (input.service_account_path) {
              const filePath: string = path.join(__dirname, '../../..', input.service_account_path);
              const serviceAccount: { [s:string]: string } = require(filePath);

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

          this.instance = firebase.initializeApp(config);
      }
  }

  public static getInstance(): FirebaseInstance {
      if (!this.instance) {
          throw new Error('Not initialize');
      }
      return this.instance;
  }
}

export default FirebaseModule;
