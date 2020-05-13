import * as firebase from 'firebase-admin';
interface FirebaseInput {
    db_url?: string;
    storage_url?: string;
    service_account_path?: string;
}
export declare type FirebaseInstance = firebase.app.App;
declare const _default: {
    initialize: (input: FirebaseInput) => void;
    getInstance: () => firebase.app.App;
};
export default _default;
