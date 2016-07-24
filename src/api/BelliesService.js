import BelliesFactory from "./BelliesFactory";
import BelliesApi from "./BelliesApi";

export default class BelliesService {
    constructor(opts) {
        this.api = BelliesFactory.createClientApi(opts && opts.profile ? opts.profile : null);
    }

    getAllAccounts() {
        return this.api.getAllAccounts();
    }

    getAllCategories() {
        return this.api.getAllAccounts();
    }

    getAllFilters() {
        return this.api.getAllAccounts();
    }

    getAllProducts() {
        return this.api.getAllAccounts();
    }

    login(email, password) {
        return this.api.login(email, password);
    }
}
