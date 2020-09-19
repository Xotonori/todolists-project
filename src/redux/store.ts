import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {todolistsReducer} from "./todolistsReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    todolistsReducer,
    authReducer
});


let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export default store;

