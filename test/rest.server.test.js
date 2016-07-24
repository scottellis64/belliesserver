import {expect} from "chai";
import request from "supertest";
import RestServer from "../src/rest/RestServer";
import BelliesFactory from "../src/api/BelliesFactory";
import BelliesService from "../src/api/BelliesService";

const service = new BelliesService({
    profile : "test"
});

describe("REST Server", () => {
    before(() => {
        return BelliesFactory.createServer();
    });

    it("should find all accounts", () => {
        return service.getAllAccounts().then((accounts) => {
           console.log(`All accounts received: ${JSON.stringify(accounts)}\n\n`);
        });
    });

    it("should find all products", () => {
        return service.getAllProducts().then((products) => {
            console.log(`All products received: ${JSON.stringify(products)}\n\n`);
        });
    });

    it("should find all categories", () => {
        return service.getAllCategories().then((categories) => {
            console.log(`All categories received: ${JSON.stringify(categories)}\n\n`);
        });
    });

    it("should find all filters", () => {
        return service.getAllFilters().then((filters) => {
            console.log(`All filters received: ${JSON.stringify(filters)}\n\n`);
        });
    });
});