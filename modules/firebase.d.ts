import * as firebase from 'firebase-admin';
interface FirebaseOpts {
    db_url?: string;
    storage_url?: string;
    service_account_path?: string;
}
export declare type FirebaseInstance = firebase.app.App;
export declare class FirebaseModule {
    static instance: FirebaseInstance;
    static initialize(input: FirebaseOpts): void;
    static getInstance(): FirebaseInstance;
}
export default FirebaseModule;
