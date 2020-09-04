import React, {memo} from 'react'
import {AppBar, Button, Toolbar} from '@material-ui/core';
import classes from "./HeaderAuth.module.scss";

export const HeaderAuth = memo((props: any) => {

    let a = true;

    return(
        <AppBar position="static">
            <Toolbar className={classes.authToolbar}>
                {a ?
                <Button color="inherit" className={classes.authButton}>Login</Button> :
                <Button color="inherit" className={classes.authButton}>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
});


