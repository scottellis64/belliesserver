import restify from "restify";
import Restifier from "./Restifier.js";
import BelliesSchema from "../db/schema/BelliesSchema";
import serverConfig from "../config/server-config";
import BelliesDb from "../db/BelliesDb";
import Promise from "promise";

export default class RestServer {
    init() {
        this.restServer = restify.createServer({
            name: "bellies.rest.server",
            version: "1.0.0"
        });

        this._initCors();

        this.restServer.use(restify.acceptParser(this.restServer.acceptable));
        this.restServer.use(restify.queryParser());
        this.restServer.use(restify.bodyParser());

        return this.buildSchemas().then(() => {
            return this.listen();
        });
    }

    buildSchemas() {
        this.belliesDb = new BelliesDb();
        return this.belliesDb.init().then(() => {
            for (let schemaName in this.belliesDb.schemas) {
                //noinspection JSUnfilteredForInLoop
                this.addResource(schemaName, this.belliesDb.schemas[schemaName]);
            }
        });
    }

    listen() {
        return new Promise((resolve) => {
            this.restServer.listen(serverConfig.rest.port, () => {
                console.log("%s listening at %s", this.restServer.name, this.restServer.url);
                resolve();
            });
        });
    }

    //
    // Adds a resource (such as account, product, category) and restify's it.
    // The resource will be accessible via the url /api/<resourceName>
    //
    addResource(resourceName, schema) {
        const restifier = new Restifier(schema.model);

        const restApiUri = "/api/" + resourceName;
        const restApiUriID = "/api/" + resourceName + "/:id";

        this.restServer.get(restApiUri, restifier.query());
        this.restServer.get(restApiUriID, restifier.detail());
        this.restServer.post(restApiUri, restifier.insert());
        this.restServer.put(restApiUriID, restifier.update());
        this.restServer.del(restApiUriID, restifier.remove());
    }

    _initCors() {
        restify.CORS.ALLOW_HEADERS.push('x-requested-with');
        restify.CORS.ALLOW_HEADERS.push('content-range');
        restify.CORS.ALLOW_HEADERS.push('x-content-range');
        restify.CORS.ALLOW_HEADERS.push('range');
        restify.CORS.ALLOW_HEADERS.push('x-range');
        restify.CORS.ALLOW_HEADERS.push('if-none-match');
        restify.CORS.ALLOW_HEADERS.push('if-match');

        restify.CORS.EXPOSE_HEADERS.push('content-range');
        restify.CORS.EXPOSE_HEADERS.push('x-content-range');

        this.restServer.use(restify.CORS());
        this.restServer.use(restify.fullResponse());
    }
}