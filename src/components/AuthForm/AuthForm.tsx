import React, {memo} from 'react'
import {Grid, TextField} from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';

export const AuthForm = memo((props: any) => {
    return (
        <div>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <AccountCircle/>
                </Grid>
                <Grid item>
                    <TextField id="input-with-icon-grid" label="With a grid"/>
                </Grid>
            </Grid>
        </div>
    );
});