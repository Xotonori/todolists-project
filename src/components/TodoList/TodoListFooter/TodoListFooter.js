import React, {Component} from 'react';
import classes from './TodoListFooter.module.scss'
import {Button} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";


class TodoListFooter extends Component {

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

        return (

            <div className={classes.TodoListFooter}>

                {!this.state.isHidden &&
                <div className={classes.filters}>
                    <Button className={classForAll}
                            onClick={this.onAllFilterClick}
                    >All
                    </Button>
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
                }

                {!this.state.isHidden && <Button onClick={this.onShowFiltersClick} className={classes.isHidden} title={'Скрыть панель фильтров'}> <VisibilityOff /> </Button>}
                {this.state.isHidden && <Button onClick={this.onHideFiltersClick} className={classes.isHidden} title={'Показать панель фильтров'}> <Visibility /> </Button>}
            </div>

        );
    }

}


export default TodoListFooter;
