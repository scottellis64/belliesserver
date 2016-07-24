import serverconfig from "../config/server-config";
import RestServer from "./RestServer";

const belliesRestServer = new RestServer();
belliesRestServer.init().then(() => {
    console.log("REST Server is running");
});
