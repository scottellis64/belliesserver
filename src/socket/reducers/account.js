import {fromJS} from "immutable";
import {CREATE_ACCOUNT, SET_ACCOUNT_FIELD, LOGIN} from "../constants/ActionTypes";

const initialState = fromJS({
    firstName: "",
    lastName: "",
    gender: "",
    month: "",
    day: "",
    year: "",
    email: "",
    password: "",
    passwordConfirm: "",
    loggedIn: false,
    rememberMe: false,
    sessionID: 0
});

function setAccountField(state, accountData) {
    return state.merge(accountData);
}

function createAccount(state) {
    return state.set("loggedIn", true);
}

function login(state, email, password) {
    if (!email || !email.length) {
        return state;
    }

    return state.merge({
        email,
        password,
        loggedIn: true,
        action: LOGIN
    });
}

export default function account(state = initialState, action = {type: "NONE"}) {
    switch (action.type) {
        case CREATE_ACCOUNT :
            return createAccount(state);

        case LOGIN :
            console.log("Logging in user " + action.email + " with password " + action.password);
            return login(state, action.email, action.password);

        case SET_ACCOUNT_FIELD :
            return setAccountField(state, action.account);

        default :
            return state;
    }
}