import React, { Component } from 'react';
import Restart from './Restart';
import '../global-css/victory-style.css'


class Victory extends Component {
    render() {
        const { counterPlayer, counterComputer } = this.props
        const result = counterPlayer > counterComputer
        return (
            <>

            {result ? (
                        <div className="relative">
                            <div className="section"> 
                                <div className="sect"> 
                                    <h1> Vous avez gagné !!! </h1>
                                    <Restart className="play"/>
                                </div>
                            </div>
                        </div>

                        
                ) : 
                    <div className="relative">
                        <div className="section1"> 
                            <div className="sect"> 
                                <h1> Vous avez perdu !!! </h1>
                                <Restart />
                            </div>
                        </div>
                    </div>
            }           
            </>
        );
    }
}

export default Victory; 