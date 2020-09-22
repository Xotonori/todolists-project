import React, {memo} from 'react'
import {Backdrop, CircularProgress} from "@material-ui/core";

export const Preloader = memo(() => {
    return (
        <Backdrop open={true} style={{zIndex: 100}}>
            <CircularProgress color="primary"/>
        </Backdrop>
    );
});



