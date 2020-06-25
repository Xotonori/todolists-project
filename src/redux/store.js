import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import todolistsReducer from "./todolistsReducer";
import thunk from 'redux-thunk'

let reducers = combineReducers({
    todolistsReducer
});

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
export default store;