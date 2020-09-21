import {instance} from "./instance";
import {CommonResponseType, signInDataType} from "../types/entities";

export const authApi = {
    signIn: (signInData: signInDataType) => {
        return instance.post<CommonResponseType<{ userId: number }>>('auth/login', {...signInData})
            .then(res => {
                console.log(res)
                return res.data
            })
    }
}

//Types
