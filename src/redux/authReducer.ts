import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authApi} from "../api/authApi";
import {setTodoLists} from "./todolistsReducer";

const initialState = {
    email: null as string | null,
    login: null as string | null,
    userId: null as number | null,
    isAuth: false,
    initializedApp: false,
    errorMessages: [] as Array<string>
}

export const authReducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {
    switch (action.type) {

        case 'SET_AUTH_DATA_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }

        case 'INITIAL_APP_SUCCESS': {
            return {
                ...state,
                initializedApp: true
            }
        }

        case 'IS_ERROR_MESSAGE_SUCCESS': {
            return {
                ...state,
                errorMessages: state.errorMessages.includes(action.errorMessage) ?
                    [...state.errorMessages] : [...state.errorMessages, action.errorMessage]
            }
        }

        case 'FILTER_ERROR_MESSAGE_SUCCESS':
            return {
                ...state,
                errorMessages: state.errorMessages.filter(message => message !== action.errorMessage)
            };

        case 'DELETE_ERROR_MESSAGES_SUCCESS':
            return {
                ...state,
                errorMessages: []
            };

        default: {
            return state;
        }
    }
}

//Actions
export const authActions = {
    setAuthDataSuccess: (isAuth: boolean, userId: number | null, email: string | null, login: string | null) => ({
        type: 'SET_AUTH_DATA_SUCCESS',
        payload: {isAuth, userId, email, login}
    } as const),
    initialAppSuccess: () => ({type: 'INITIAL_APP_SUCCESS'} as const),
    isErrorMessageSuccess: (errorMessage: string) => ({type: 'IS_ERROR_MESSAGE_SUCCESS', errorMessage} as const),
    filterErrorMessagesSuccess: (errorMessage: string) => ({type: 'FILTER_ERROR_MESSAGE_SUCCESS', errorMessage} as const),
    deleteErrorMessagesSuccess: () => ({type: 'DELETE_ERROR_MESSAGES_SUCCESS'} as const)
}

//Thunks
export const signInThunk = (email: string, password: string, rememberMe: boolean, captcha: boolean): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    try {
        const data = await authApi.signIn({email, password, rememberMe, captcha});
        if (data.resultCode === 0) {
            dispatch(setAuthDataThunk());
            dispatch(setTodoLists());
        } else {
            data.messages.map(err => dispatch(authActions.isErrorMessageSuccess(err)))
        }
    } catch (e) {
        dispatch(authActions.isErrorMessageSuccess(e.response.data.message));
    }
}

export const logOutThunk = (): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {

    const todolistsId = getState().todolistsReducer.todolists.map(todo=>todo.id);
    console.log(todolistsId)

    try {
        const data = await authApi.logOut();
        if (data.resultCode === 0) {
            dispatch(authActions.setAuthDataSuccess(false, null, null, null));
        } else {
            data.messages.map(err => dispatch(authActions.isErrorMessageSuccess(err)))
        }
    } catch (e) {
        dispatch(authActions.isErrorMessageSuccess(e.response.data.message));
    }
}

export const setAuthDataThunk = (): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    try {
        const data = await authApi.authMe();
        const {id: userId, email, login} = data.data;
        if (data.resultCode === 0) {
            dispatch(authActions.setAuthDataSuccess(true, userId, email, login));
        } else {
            data.messages.map(err => dispatch(authActions.isErrorMessageSuccess(err)))
        }
    } catch (e) {
        dispatch(authActions.isErrorMessageSuccess(e.response.data.message));
    }
}

export const initialAppThunk = (): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {

    const promise = dispatch(setAuthDataThunk());

    // @ts-ignore
    promise.then(() => {
        dispatch(authActions.initialAppSuccess());
    });

}

//Types
type InitialStateType = typeof initialState;
export type TodoActionTypes = InferActionTypes<typeof authActions>
export type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionTypes>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodoActionTypes>


