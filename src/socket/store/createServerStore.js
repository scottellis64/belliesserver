import {createStore} from "redux";
import rootReducer   from "../reducers/index";

export default function createServerStore() {
    return createStore(rootReducer);
}