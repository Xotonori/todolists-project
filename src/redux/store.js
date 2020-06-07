import {combineReducers, createStore} from "redux";
import todolistsReducer from "./todolistsReducer";

let reducers = combineReducers({
    todolistsReducer
});

const store = createStore(reducers);
export default store;