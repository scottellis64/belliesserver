import cson from "cson";
import mongoose from "mongoose";
import serverconfig from "../../config/server-config";
import Promise from "promise";
import {fromJS} from "immutable";

export default class BelliesSchema {
    constructor(model, schemaName) {
        this.model = model;
        this.schemaName = schemaName;
        mongoose.Promise = Promise;
    }

    loadTestData() {
        return new Promise((resolve, reject) => {
            const data = fromJS(cson.load(`${process.cwd()}/src/db/schema/data/${this.schemaName}-data.json`));

            if (data) {
                const schemaRows = data.get(this.schemaName);
                if (schemaRows) {
                    this.processDataRows(schemaRows).then(() => {
                        resolve();
                    });
                } else {
                    reject(`No schema specified for schema ${this.schemaName}`);
                }
            } else {
                return reject(`No schema specified for schema ${this.schemaName}`);
            }
        });
    }

    processDataRows(schemaRows, prev) {
        const promise = this.processDataRowPromise(schemaRows.first(), prev);
        if (schemaRows.size == 1) {
            return promise;
        } else {
            return promise.then(() => {
                return this.processDataRows(schemaRows.delete(0), promise);
            });
        }
    }

    processDataRowPromise(schemaRow, prev) {
        if (prev) {
            return prev.then(() => {
                return this.save(schemaRow).then((modelData) => {
                    return modelData;
                });
            })
        } else {
            return this.save(schemaRow).then((modelData) => {
                return modelData;
            });
        }
    }

    save(schemaRow) {
        return new Promise((resolve) => {
            const modelData = new this.model(schemaRow.toJS());
            return modelData.save().then(() => {
                resolve(modelData);
            });
        });
    }

    all() {
        return this.model.find({}).exec();
    }

    remove(data) {
        return this.model.remove({_id: data._id}).exec();
    }

    showAll() {
        return this.all().then((data) => {
            console.log(`${this.schemaName}.showAll: ${JSON.stringify(data, null, 4)}`);
        });
    }

    removeAll() {
        return this.model.remove({}).exec();
    }

    static onError(err) {
        console.log(err);
        throw err;
    }

    getById(id) {
        return this.model.findOne({_id: id}).exec();
    }

    get(opts) {
        return this.model.findOne(opts).exec();
    }
}
