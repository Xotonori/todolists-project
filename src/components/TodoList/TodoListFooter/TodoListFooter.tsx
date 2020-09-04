import React, {Component} from 'react';
import classes from './TodoListFooter.module.scss'
import {Button, Fade} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

type OwnPropsType = {
    filterValue: string;
    changeFilter: (newFilterValue: string) => void;
}
type StateType = {
    isHidden: boolean;
}

class TodoListFooter extends Component<OwnPropsType, StateType> {
    state = {
        isHidden: false
    };

    onAllFilterClick = () => {
        this.props.changeFilter('All');
    };
    onCompletedFilterClick = () => {
        this.props.changeFilter('Completed');
    };
    onActiveFilterClick = () => {
        this.props.changeFilter('Active');
    };
    onShowFiltersClick = () => {
        this.setState({isHidden: true});
    };
    onHideFiltersClick = () => {
        this.setState({isHidden: false});
    };

    render() {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        const hiddenValue = this.state.isHidden;

        return (
            <div className={classes.TodoListFooter}>
                {!hiddenValue &&
                <Fade in={!hiddenValue} timeout={700}>
                    <div className={classes.filters}>
                        <Button className={classForAll}
                                onClick={this.onAllFilterClick}
                        >All </Button>
                        <Button className={classForCompleted}
                                onClick={this.onCompletedFilterClick}
                                color={'primary'}
                        >Completed
                        </Button>
                        <Button className={classForActive}
                                onClick={this.onActiveFilterClick}
                                color={'secondary'}
                        >Active
                        </Button>
                    </div>
                </Fade>
                }

                {!this.state.isHidden && <Button onClick={this.onShowFiltersClick}
                                                 className={classes.isHidden}
                                                 title={'Скрыть панель фильтров'}> <VisibilityOff/> </Button>}
                {this.state.isHidden && <Button onClick={this.onHideFiltersClick}
                                                className={classes.isHidden}
                                                title={'Показать панель фильтров'}> <Visibility/> </Button>}
            </div>

        );
    }

}


export default TodoListFooter;
