import React from 'react';
import classes from './DeleteItem.module.scss'
import {Button} from '@material-ui/core';
import {Delete, Backspace} from '@material-ui/icons';

class DeleteItem extends React.Component {
    render() {

        if (this.props.buttonStyle === 'taskDeleteButton') {
            return (
                <div className={`${classes.DeleteItemWrapper} ${classes.DeleteItemWrapperBackspace}`}>
                    <Button className={classes.DeleteItem}
                            onClick={this.props.deleteItem}>
                        <Backspace className={classes.Backspace}/>
                    </Button>
                </div>

            )
        }

        return (
            <div className={classes.DeleteItemWrapper}>
                <Button className={classes.DeleteItem}
                        onClick={this.props.deleteItem}
                        variant="contained"
                        color="primary">
                    <Delete className={classes.Delete}/>
                </Button>
            </div>
        )
    }
}

export default DeleteItem;