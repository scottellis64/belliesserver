import {expect} from "chai";

import createServerStore from "../src/socket/store/createServerStore";
import startSocketServer from "../src/socket/server/socket-io-server";

startSocketServer(createServerStore());

describe("Socket server", () => {
    it("should be running", () => {
        expect(1 + 1).to.equal(2);
    });
});