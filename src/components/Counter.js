import React, { Component } from 'react';
import '../global-css/counter-style.css';

class Counter extends Component {


    render() {
        const { counterPlayer, counterComputer } = this.props
        return (
            <div className="counter">
                <div className="counterMargin"> Player <span className="marginScorePlayer"> {counterPlayer} </span></div>
                <div className="counterMargin"> | </div>
                <div className="counterMargin"> <span className="marginScoreComputer"> {counterComputer} </span> Computer </div>
            </div>
        );
    }
}

export default Counter;