import React, { Component } from 'react';
import '../global-css/theme-style.css'

class Theme extends Component {
    render() {
        return (
            <div className="custom-select">
                <select onChange={this.props.onClick} className="form-select">
                    <option value="onePiece">One Piece</option>
                    <option value="lotr">Lord of The Rings</option>
                    <option value="minions">Minions</option>
                </select>
            </div>
        );
    }
}

export default Theme;