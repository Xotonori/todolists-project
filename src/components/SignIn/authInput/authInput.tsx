import React, {memo} from 'react'
import {Input} from "@material-ui/core";
import classes from './authInput.module.scss'

export const authInput = memo((props: any) => {

    return (
        <div className={classes.InputWrapper}>
            <div className={classes.Icon}>
                {props.icon}
            </div>
            <div>
                <Input required {...props}/>
            </div>
        </div>
    );
});