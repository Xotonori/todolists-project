import React, {Component} from 'react';

class Input extends Component {

    render() {
        return (
            <input type="text"
                   placeholder={this.props.placeholder}
                   className={this.props.errorClass}
                   onChange={this.props.onChange}
                   onKeyPress={this.props.onKeyPress}
                   value={this.props.value}
            />
        );
    }
}

export default Input;
