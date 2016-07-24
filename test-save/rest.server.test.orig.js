import {expect} from "chai";
import request from "supertest";
import serverConfig from "../src/config/server-config";
import RestServer from "../src/rest/RestServer";

const restURL = `http://${serverConfig.rest.server}:${serverConfig.rest.port}`;

describe("REST Server", () => {
    before(() => {
        const belliesRestServer = new RestServer();
        return belliesRestServer.init().then(() => {
            console.log("REST Server is initialized\n\n");
        });
    });

    it("should find all accounts", () => {
        request(restURL)
            .get("/api/account")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                try {
                    expect(res.body.length).to.equal(2);
                } catch (e) {
                    console.log(e);
                    throw e;
                }

                done();
            });
    });

    it("should find an account by email", () => {
        request(restURL)
            .get("/api/account?q=" + JSON.stringify({
                email : "jackett_dad@yahoo.com"
            }))
            .expect(200)
            .expect("Content-Type", /json/)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                try {
                    expect(res.body.length).to.equal(1);
                } catch (e) {
                    console.log(e);
                    throw e;
                }

                done();
            });
    });

    it("should find all products", () => {
        console.log("find all products");

        request(restURL)
            .get("/api/product")
            .expect(200)
            .expect("Content-Type", /json/)
            .end(function(err, res) {
                console.log("Did we get here?");
                if (err) {
                    console.log(err);
                    throw err;
                }

                try {
                    console.log(`${res.body}`);
                    expect(res.body.length).to.equal(21);
                } catch (e) {
                    console.log(e);
                    throw e;
                }

                done();
            });
    });

    //it("should get an account by ID", () => {
    //    request(restURL)
    //        .get("/api/account/57896e88bfe9c6ed1448a10c")
    //        .end((err, res) => {
    //            if (err) {
    //                throw err;
    //            }
    //
    //            console.log(res.body);
    //            done();
    //        });
    //});


});