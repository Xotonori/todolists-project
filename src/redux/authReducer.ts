import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

const initialState = {
    email: '',
    login: '',
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {
    switch (action.type) {


        default: {
            return state;
        }
    }
}

//Actions
export const actions = {

}

//Thunks

//Types
type InitialStateType = typeof initialState;
export type TodoActionTypes = InferActionTypes<typeof actions>
export type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionTypes>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodoActionTypes>


