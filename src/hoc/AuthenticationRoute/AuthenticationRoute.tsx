import React, {FC, memo} from 'react'
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

type Props = {
    Component: FC | any,
    exact?: boolean,
    path: string
}

export const AuthenticationRoute: FC<Props> = memo(({Component, exact, path, ...rest}) => {
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth);
    return (
        <Route
            exact={exact}
            path={path}
            render={() =>
                isAuth ? <Component {...rest}/> : <Redirect to='/sign-in'/>
            }
        />
    );
});