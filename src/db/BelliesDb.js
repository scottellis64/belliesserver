import AccountSchema from "./schema/AccountSchema";
import serverconfig from "../config/server-config";
import mongoose from "mongoose";
import {fromJS} from "immutable";
import BelliesSchema from "./schema/BelliesSchema";
import Promise from "promise";

export default class BelliesDb {
    constructor() {
        this.dbConfig = fromJS(serverconfig.db);

        this.uri = "mongodb://" + this.dbConfig.get("server");

        var port = this.dbConfig.get("port");
        if (port) {
            this.uri += ":" + port;
        }

        this.uri += "/" + this.dbConfig.get("dbName");
    }

    init() {
        return new Promise((resolve, reject) => {
            mongoose.connect(this.uri);
            var db = mongoose.connection;

            db.on("error", (err) => {
                console.error(`Connection error: ${JSON.stringify(err)}`);
                reject(err);
            });

            db.once("open", () => {
                console.log("Database connection established.  Preparing database...");
                return this.prepareDatabase().then(() => {
                    resolve(`Successfully connected to ${this.uri}`);
                });
            });
        });
    }

    prepareDatabase() {
        this.schemas = {};
        const schemaMetas = this.dbConfig.get("tables");
        return this.createSchemas(schemaMetas, schemaMetas.keys());
    }

    createSchemas(schemaMetas, keys, prev) {
        const tableName = keys.next().value;
        if (! tableName) {
            return;
        }

        const promise = this.createSchemaPromise(tableName, prev);
        return schemaMetas.size == 1 ? promise : promise.then(() => {
            return this.createSchemas(schemaMetas.delete(0), keys, promise);
        });
    }

    createSchemaPromise(tableName, prev) {
        if (prev) {
            console.log(`Initializing ${tableName} after previous init completes`);
            return prev.then(() => {
                console.log(`Initializing ${tableName} now that the previous init is complete`);
                return this.createSchema(tableName);
            });
        } else {
            console.log(`Initializing ${tableName} with no previous init`);
            return this.createSchema(tableName);
        }
    }

    createSchema(tableName) {
        return new Promise((resolve, reject) => {
            console.log(`Executing the schema init of ${tableName}`);

            const schema = new mongoose.Schema(serverconfig.db.tables[tableName].structure);
            let belliesSchema = null;
            try {
                belliesSchema = new BelliesSchema(mongoose.model(tableName, schema), tableName);
            } catch (e) {
                console.log(e);
                return reject(e);
            }

            console.log(`Executed the schema init of ${tableName}`);

            this.schemas[tableName] = belliesSchema;

            if (this.dbConfig.get("loadData") || this.dbConfig.getIn(["tables", tableName]).get("loadData")) {
                console.log(`Deleting existing data for schema ${tableName}`);

                return belliesSchema.removeAll().then(() => {
                    console.log("All data is removed, loading test data");
                    return belliesSchema.loadTestData().then(() => {
                        resolve(`Schema ${tableName} created--test data loaded`, belliesSchema);
                    });
                });
            } else {
                resolve(`Schema ${tableName} created--no data loaded`, belliesSchema);
            }
        }).then((status) => {
            console.log(status);
        });
    }

    getProductsSchema() {
        return this.schemas["product"];
    }

    getAccountsSchema() {
        return this.schemas["account"];
    }

    resetDatabase() {
    }
}



