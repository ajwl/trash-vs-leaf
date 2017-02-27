import React from "react";

class Greeting extends React.Component{

    constructor(props){
        super(props);
        this.state = { score: 5 };
    }

    render(){
        return(
            <div className="App">
                <p>Greetings, more greetings</p>
            </div>
        )
    }
}

Greeting.propTypes = {
    name: React.PropTypes.string
};

export default Greeting;