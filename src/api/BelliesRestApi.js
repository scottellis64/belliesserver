import {Client} from "node-rest-client";
import BelliesApi from "./BelliesApi";
import Promise from "promise";
import serverconfig from "../config/server-config";

export default class BelliesRestApi extends BelliesApi {
    constructor(opts) {
        super();

        this.url = opts.url;

        this.client = new Client();

        //this.client.registerMethod("products", `${url}/product`, "GET");
        //this.client.registerMethod("accounts", `${url}/account`, "GET");
        //this.client.registerMethod("categories", `${url}/category`, "GET");
        //this.client.registerMethod("filters", `${url}/filter`, "GET");

        this.defaultArgs = {
            headers: {
                "Content-Type" : "application/json"
            }
        };
    }

    _get(resource, args) {
        return new Promise((resolve) => {
            this.client.get(this.url + "/" + resource, args || {}, (data, response) => {
                resolve(data);
            });
        });
    }

    getAllAccounts() {
        return this._get("account", this.defaultArgs);
    }

    getAllCategories() {
        return this._get("category", this.defaultArgs);
    }

    getAllFilters() {
        return this._get("filter", this.defaultArgs);
    }

    getAllProducts() {
        return this._get("product", this.defaultArgs);
    }
}