import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authApi} from "../api/authApi";

const initialState = {
    email: '',
    login: '',
    userId: null as null | number,
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {
    switch (action.type) {

        case 'IS_AUTH_SUCCESS': {
            return {
                ...state,
                isAuth: action.isAuth,
                userId: action.userId
            }
        }

        default: {
            return state;
        }
    }
}

//Actions
export const actions = {
    isAuthSuccess: (isAuth: boolean, userId: number) => ({type: 'IS_AUTH_SUCCESS', isAuth, userId} as const)
}

//Thunks
export const signInThunk = (email: string, password: string, rememberMe: boolean, captcha: boolean): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    const {resultCode: isAuth, data: {userId}} = await authApi.signIn({email, password, rememberMe, captcha});
    await dispatch(actions.isAuthSuccess(!isAuth, userId));
}

//Types
type InitialStateType = typeof initialState;
export type TodoActionTypes = InferActionTypes<typeof actions>
export type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionTypes>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodoActionTypes>


