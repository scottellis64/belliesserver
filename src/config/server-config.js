const mode = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
const isProduction = mode == "production";

const restServer = "localhost";
const restPort = "8097";

const dbServer = process.env.OPENSHIFT_MONGODB_DB_HOST ? process.env.OPENSHIFT_MONGODB_DB_HOST : "localhost";

//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
//    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}

import BelliesRestApi from "../api/BelliesRestApi";
import BelliesRestServerFactory from "../api/BelliesRestServerFactory";

const serverconfig = {
    db: {
        dbName : "belliesserver",
        server : dbServer,

        loadData : true,

        tables : {
            account : {
                //loadData : true,
                structure : {
                    firstName: String,
                    lastName: String,
                    gender: String,
                    month: String,
                    day: String,
                    year: String,
                    email: String,
                    password: String
                }
            },

            product : {
                //loadData : true,
                structure : {
                    id : String,
                    name : String,
                    shortDesc : String,
                    description : String,
                    price : String
                }
            },

            filter : {
                //loadData : true,
                structure : {
                    id : String,
                    label : String,
                    group : String
                }
            },

            category : {
                //loadData : true,
                structure : {
                    id : String,
                    name : String,
                    shortDesc : String,
                    description : String
                }
            }
        }
    },

    socket : {
        port : "8095"
    },

    rest : {
        port : restPort,
        server : restServer
    },

    mode : {
        value : mode,
        production : isProduction
    },

    factory : {
        dev : {
            client : {
                typeClass : BelliesRestApi,
                opts : {
                    url : `http://${restServer}:${restPort}/api`
                }
            },

            server : {
                typeClass : BelliesRestServerFactory
            }
        },

        production : {
            client : {
                typeClass : BelliesRestApi,
                opts : {
                    url : `http://${restServer}:${restPort}/api`
                }
            },

            server : {
                typeClass : BelliesRestServerFactory
            }
        },

        test : {
            client : {
                typeClass : BelliesRestApi,
                opts : {
                    url : `http://${restServer}:${restPort}/api`
                }
            },

            server : {
                typeClass : BelliesRestServerFactory
            }
        }
    }
};

export default serverconfig;