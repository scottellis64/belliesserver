import RestServer from "../rest/RestServer";

export default class BelliesRestServerFactory {
    static createServer() {
        const belliesRestServer = new RestServer();
        return belliesRestServer.init().then(() => {
            console.log("Bellies RestServer open for business");
        });
    }
}