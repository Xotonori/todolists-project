import {combineReducers, createStore} from "redux";
import todolistsReducer from "./todolistsReducer";

export const ROOT_URL = 'https://social-network.samuraijs.com/api/1.1/todo-lists';
const API_KEY = 'b08b218c-1bb1-4bbc-9d99-adc8b3f17984';
export const serverAccess = {withCredentials: true, headers: {'API-KEY': API_KEY}};


let reducers = combineReducers({
    todolistsReducer
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;