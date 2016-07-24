import {expect} from "chai";
import serverConfig from "../src/config/server-config";
import BelliesDb from "../src/db/BelliesDb";

let belliesDb = null;

describe("BelliesDB", () => {
    before(() => {
        belliesDb = new BelliesDb();
        return belliesDb.init().then(() => {
            console.log("Database initialized.\n\n")
        });
    });

    it("shows all products", () => {
        return belliesDb.getProductsSchema().showAll().then(() => {
            console.log("Done!\n\n");
        });
    });

    it("shows all accounts", () => {
        return belliesDb.getAccountsSchema().showAll().then(() => {
            console.log("Done!\n\n");
        });
    });
});