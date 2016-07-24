import serverconfig from "../config/server-config";

export default class BelliesFactory {
    //
    // Creates api based upon the provided profile, which can be "dev", "production" or "test".
    // If profile is not provided, then the mode property in server-config is used instead
    //
    static createClientApi(profile) {
        if (! profile) {
            profile = serverconfig.mode.value;
        }

        const factoryApiSettings = serverconfig.factory[profile].client;
        return new factoryApiSettings.typeClass(factoryApiSettings.opts);
    }

    static createServer(profile) {
        if (! profile) {
            profile = serverconfig.mode.value;
        }

        const factoryServerSettings = serverconfig.factory[profile].server;
        return factoryServerSettings.typeClass.createServer();
    }
}