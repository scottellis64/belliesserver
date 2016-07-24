import Promise from "promise";

//
// BelliesApi provides the functionality to reach the back end to retrieve products, categories, filters, accounts, etc.
// Nothing is actually implemented here.  Although not enforced by language constructs, all methods in this class should
// be treated as an interface or an abstract base class.
//
// Actual implementations extend this and provide real implementations.  Such as these include:
//      BelliesRestClientApi - communicates via a REST interface with the backend.
//      BelliesDBDirectApi - talks directly to the backend.
//
// The server-config contains settings that indicate which implementation to use.
//
// BelliesService will contain the instantiation of this API, but it will not concern itself with how the api is implemented, but
// it will work with promises, so it will invoke all API calls like this:
//
// api.doSomething().then((result) => { // do something with the result })
//

export default class BelliesApi {
    getAllAccounts() {
        return new Promise((resolve) => { resolve([]); });
    }

    getAllCategories() {
        return new Promise((resolve) => { resolve([]); });
    }

    getAllFilters() {
        return new Promise((resolve) => { resolve([]); });
    }

    getAllProducts() {
        return new Promise((resolve) => { resolve([]); });
    }

    login(email, password, callback, errorCallback) {
        return new Promise((resolve) => { resolve({}); });
    }
}