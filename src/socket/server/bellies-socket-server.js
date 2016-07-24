import createServerStore from "../store/createServerStore";
import startSocketServer from "./socket-io-server";

startSocketServer(createServerStore());

