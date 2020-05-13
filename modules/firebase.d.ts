import * as firebase from 'firebase-admin';
interface IFirebaseInput {
    db_url?: string;
    storage_url?: string;
    service_account_path?: string;
}
declare const _default: {
    initialize: (input: IFirebaseInput) => void;
    getInstance: () => firebase.app.App;
};
export default _default;
