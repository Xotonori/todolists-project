import React, {memo} from 'react'
import {Backdrop, CircularProgress} from "@material-ui/core";

export const Preloader = memo(() => {
    return (
        <Backdrop open={true} style={{zIndex: 1}}>
            <CircularProgress color="primary"/>
        </Backdrop>
    );
});



