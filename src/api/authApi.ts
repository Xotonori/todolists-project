import {instance} from "./instance";
import {CommonResponseType, SignInDataType} from "../types/entities";

export const authApi = {
    signIn: (signInData: SignInDataType) => {
        return instance.post<CommonResponseType<{ userId: number }>>('auth/login', {...signInData})
            .then(res => res.data)
    },
    logOut: () => {
        return instance.delete<CommonResponseType<{}>>('auth/login')
            .then(res => res.data)
    },
    authMe: () => {
        return instance.get<CommonResponseType<AuthMeDataType>>('auth/me')
            .then(res => res.data)
    }
}

//Types
type AuthMeDataType = {
    id: number,
    email: string,
    login: string
}
