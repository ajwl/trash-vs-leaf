import React from 'react';

class LevelTwo extends React.Component{
    constructor(props){
        super(props);
        this.state = { name: 'Lady'}
    }
    render(){
        return(
            <div className="App">
                <p>Hello greetings from here {this.state.name}</p>
            </div>
        )
    }
}

LevelTwo.propTypes = {
  name: React.PropTypes.string
};


export default LevelTwo;