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
		<div className="item leaf" onClick={props.onLeafPick}>
				<img src="img/yellow-leaf.png" />
		</div>
    )
};
Leaf.propTypes = {
	onLeafPick: React.PropTypes.func.isRequired
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

class App extends React.Component {

   constructor(props){
       super(props);
       this.state = { score: 0, trash: 0 };
       this.onPickUp = this.onPickUp.bind(this);
       this.onLeafPick = this.onLeafPick.bind(this);
       this.trashNumber = this.trashNumber.bind(this);
    }

    onPickUp() {
        this.state.score += 1;
        this.setState({score: this.state.score});
        this.trashNumber();
    }

    onLeafPick() {
        this.state.score -= 1;
        this.setState({score: this.state.score});
        this.trashNumber();
    }

    trashNumber(){
        let rando = Math.floor(Math.random() * NUMBERITEMS );
        this.setState({ trash: rando });
    }

    componentDidMount(){
        setInterval(this.trashNumber, 1000);
    }


    render() {
        let thingsInGrid = [];

        for(let i=0; i < NUMBERITEMS; i++) {
            thingsInGrid.push( <Leaf key={i.toString()} onLeafPick={ this.onLeafPick }/> );
        }

        thingsInGrid.map((item, index) => {
            if (index === this.state.trash) {
                thingsInGrid.splice( index, 1, <CrispPacket key={index.toString()} onPickUp={ this.onPickUp }/> );
            }
        });

        return (
			<div className="App">
				<BinBag score={this.state.score}/>
				<p>Hello {this.props.name} can you complete this task?</p>
				<div className="grid">
                    { thingsInGrid }
				</div>
			</div>
        )
    }
};

App.propTypes = {
    name: React.PropTypes.string,
    score: React.PropTypes.number
};

ReactDOM.render(<App name="challenger" score={0}/>, document.getElementById("root"));
