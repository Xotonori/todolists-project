import React, {Component} from 'react';
import classes from './TodoListFooter.module.css'


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
                    <button className={classForAll}
                            onClick={this.onAllFilterClick}
                    >All
                    </button>
                    <button className={classForCompleted}
                            onClick={this.onCompletedFilterClick}
                    >Completed
                    </button>
                    <button className={classForActive}
                            onClick={this.onActiveFilterClick}
                    >Active
                    </button>
                </div>
                }

                {!this.state.isHidden && <span onClick={this.onShowFiltersClick} className={classes.isHidden}> hide </span>}
                {this.state.isHidden && <span onClick={this.onHideFiltersClick} className={classes.isHidden}> show </span>}
            </div>

        );
    }

}


export default TodoListFooter;
