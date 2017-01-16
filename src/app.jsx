import React from 'react';
import ReactDOM from 'react-dom';


const NUMBERITEMS = 6;
var thingsInGrid = [];

function CrispPacket(props){
	return(
        <div className="item crisps" onClick ={props.onPickUp}>
            <img src="img/crisps.jpeg" />
        </div>
		)
};
CrispPacket.propTypes = {
	onPickUp: React.PropTypes.func.isRequired
};

function Leaf(props){
    return(
		<div className="item leaf" onClick={props.onPickUp}>
            <img src="img/yellow-leaf.png" />
		</div>
    )
};
Leaf.propTypes = {
	onPickUp: React.PropTypes.func.isRequired
};

function BinBag(props){
    return(
        <div className="binbag">
            <div>
                <span className="big-number">{props.score}</span>
            </div>
        </div>
    )
};
BinBag.propTypes = {
	score: React.PropTypes.number.isRequired
};


class StopWatch extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.interval = setInterval(this.props.onTick, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.props.interval);
    }

    render() {
        return (
            <div className="counter">
                <p>{this.props.elapsed}</p>
                { this.props.running ?
                    <button disabled="true">Go go go!</button>
                    :
                    <button onClick={this.props.onStart }>Start the game!</button>
                }
            </div>
        )
    }
};
StopWatch.propTypes = {
    running: React.PropTypes.bool.isRequired,
    elapsed: React.PropTypes.number.isRequired,
    onStart: React.PropTypes.func.isRequired
};

class GameGrid extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        setInterval(this.indexOfTrash, 1000);
    }

    render(){
        let thingsInGrid = [];
        for(let i=0; i < NUMBERITEMS; i++) {
            thingsInGrid.push( <Leaf key={i.toString()} onPickUp={ this.props.onPickUp }/> );
        }
        thingsInGrid.map((item, index) => {
            if (index === this.props.trash) {
                thingsInGrid.splice( index, 1, <CrispPacket key={index.toString()} onPickUp={ this.props.onPickUp }/> );
            }
        });

        return (
           <div className="grid">
               {thingsInGrid}
           </div>
        )
    }
}
GameGrid.propTypes = {
    trash: React.PropTypes.number.isRequired,
    onPickUp: React.PropTypes.func.isRequired,
    running: React.PropTypes.bool.isRequired
};

class App extends React.Component {

   constructor(props){
       super(props);
       this.state = { score: 0, trash: 0, running: false, elapsed: 0 };

       this.onPickUp = this.onPickUp.bind(this);
       this.indexOfTrash = this.indexOfTrash.bind(this);
       this.onStart = this.onStart.bind(this);
       this.onTick = this.onTick.bind(this);
       this.onStop = this.onStop.bind(this);
    }

    onStart(){
        console.log("this click thing set running");
        this.setState({running: true});
    }

    onTick(){
        if(this.state.running == true){
            if(this.state.elapsed < 30){
                this.state.elapsed += 1;
                this.setState({ elapsed: this.state.elapsed });
            }
            else{
                this.onStop();
            }
        }
    }

    onStop(){
        this.setState({
            running: false,
            elapsed: 0
        });
    }

    indexOfTrash(){
        let rando = Math.floor(Math.random() * NUMBERITEMS );
        this.setState({ trash: rando });
    }

    onPickUp(e) {
        if(e.target.parentNode.classList.contains("crisps")){
            this.state.score += 1;
        }
        else{
            this.state.score -= 1;
        }
        this.setState({score: this.state.score});
        this.indexOfTrash();
    }

    render() {
        return (
			<div className="App">
				<BinBag score={this.state.score}/>
				<p>Hello {this.props.name} can you complete this task?</p>
                <StopWatch elapsed={this.state.elapsed} onClick={this.onStart} running={this.state.running}/>
                <GameGrid running={this.state.running} trash={this.state.trash} onPickUp={this.onPickUp}/>
			</div>
        )
    }
};

App.propTypes = {
    name: React.PropTypes.string,
    score: React.PropTypes.number
};

ReactDOM.render(<App name="challenger" />, document.getElementById("root"));
