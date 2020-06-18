import {combineReducers, createStore} from "redux";
import todolistsReducer from "./todolistsReducer";

let reducers = combineReducers({
    todolistsReducer
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;