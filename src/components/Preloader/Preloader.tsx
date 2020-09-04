import React, {memo} from 'react'
import {Backdrop, CircularProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import { AppStateType } from '../../redux/store';

export const Preloader = memo(() => {
    const {todolistsReducer: {isFetching}} = useSelector((state: AppStateType) => state);
    return (
        isFetching ? <Backdrop open={true} style={{zIndex: 1}}>
            <CircularProgress color="primary"/>
        </Backdrop> : <div/>
    );
});



