import React, {memo} from 'react'
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers';
import {schemaSignInForm} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {authInput} from './authInput/authInput';
import {Button} from '@material-ui/core';
import {AccountCircle, Lock} from "@material-ui/icons";
import classes from './SignIn.module.scss';
import {signInThunk} from "../../redux/authReducer";
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../../redux/store";


export const SignIn = memo(() => {

    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth);
    const dispatch = useDispatch();

    const {handleSubmit, errors, control, reset} = useForm<FormInputsType>({
        resolver: yupResolver(schemaSignInForm)
    });

    const onSubmit = (data: FormInputsType) => {
        const rememberMe = true;
        const captcha = true;
        dispatch(signInThunk(data.email, data.password, rememberMe, captcha));
    };

    if (isAuth) {
        return <Redirect to={`/todolists`}/>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>

            <div className={classes.ControllerWrapper}>
                <Controller
                    as={authInput}
                    defaultValue=""
                    name="email"
                    control={control}
                    placeholder="Enter your email"
                    icon={<AccountCircle/>}
                    error={errors.email?.message}
                />
                {errors.email && <p className={classes.ErrorMessage}>{errors.email.message}</p>}
            </div>

            <div className={classes.ControllerWrapper}>
                <Controller
                    as={authInput}
                    defaultValue=""
                    name="password"
                    type='password'
                    control={control}
                    placeholder="Enter your password"
                    icon={<Lock/>}
                    error={errors.password?.message}
                />
                {errors.password && <p className={classes.ErrorMessage}>{errors.password.message}</p>}
            </div>

            <Button type={'submit'} onClick={() => reset()} className={classes.Button}>Sign In</Button>
        </form>
    );
});

//Types
type FormInputsType = {
    email: string,
    password: string,
}