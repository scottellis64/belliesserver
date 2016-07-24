import serverconfig from "../../config/server-config";
import BelliesDb from "../../db/BelliesDb";
import Server from "socket.io";

import {LOGIN, LOGIN_RESPONSE} from "../constants/ActionTypes";

let belliesDb = null;
let socket = null;

function getResponseOld(state) {
    const products = state.products;
    const categories = state.categories;
    const filters = state.filters;

    let response = {};

    if (products) {
        let list = products.get("list");
        if (list) {
            response.products = list.toJS();
        }
    }

    if (categories) {
        const allCategories = categories.get("allCategories");
        if (allCategories) {
            response.categories = allCategories.toJS();
        }

        const category = categories.get("category");
        if (category) {
            response.category = category.toJS();
        }
    }

    if (filters) {
        let filter = filters.get("filter");
        if (filter) {
            response.filter = list.toJS();
        }

        let allFilters = filters.get("allFilters");
        if (allFilters) {
            response.filters = allFilters.toJS();
        }
    }

    let selectedFilters = state.selectedFilters;
    if (selectedFilters) {
        response.selectedFilters = selectedFilters.toJS();
    }

    return response;
}

function sendResponse(state) {
    let response = {};

    if (state.account && state.account.get("action") === LOGIN) {
        let account = state.account;
        account = account.delete("action");
        response.action = LOGIN_RESPONSE;

        belliesDb.login(account.get("email"), account.get("password"), function (accountData) {
            response.account = account.merge(accountData).toJS();
            console.log("Login response with state " + JSON.stringify(response));
            socket.emit("state", response);
        }, function (err) {
            response.account = account.merge({
                loggedIn: false,
                failureReason: err
            }).toJS();
            console.log("Returning error login response " + JSON.stringify(response));
            socket.emit("state", response);
        });
    } else {
        console.log("General socket response with state " + JSON.stringify(response));
        socket.emit("state", response);
    }
}

function setActionAndDispatch(store, action) {
    store.dispatch(action);
}

export default function startSocketServer(store) {
    belliesDb = new BelliesDb();

    try {
        belliesDb.setup();
        //belliesDb.resetDatabase();
    } catch (e) {
        console.error(e);
    }

    socket = new Server().attach(serverconfig.socket.port);

    store.subscribe(
        () => {
            sendResponse(store.getState());
        }
    );

    socket.on('connection', (socket) => {
        const state = store.getState();
        if (state) {
            sendResponse(state);
            socket.on("action", store.dispatch.bind(store));
        }
    });
}