import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {todolistsReducer} from "./todolistsReducer";

const rootReducer = combineReducers({
    todolistsReducer,
    // authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;