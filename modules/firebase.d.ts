interface IFirebaseInput {
    db_url?: string;
    storage_url?: string;
    service_account_path: string;
}
declare const _default: {
    initialize: (input: IFirebaseInput) => void;
    getInstance: () => any;
};
export default _default;
