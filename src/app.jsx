import React from 'react';
import ReactDOM from 'react-dom';


var numberItems = 6;

var makeGrid = function(){
    let rando = Math.floor(Math.random() * 6 + 0);
	var items = [];
    for (let i =0; i < numberItems; i++){
    	if(i === rando) {
            items.push("crisps");
        }
        else {
			items.push("leaf")
		}
    };
	return items;
};

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
       this.state = { score: 0, list: [], grid: [] };
       this.onPickUp = this.onPickUp.bind(this);
       this.onLeafPick = this.onLeafPick.bind(this);
       this.newList = this.newList.bind(this);
    }

    onPickUp() {
        this.state.score += 1;
        this.setState({score: this.state.score});
    }

    onLeafPick() {
        this.state.score -= 1;
        this.setState({score: this.state.score});
    }

    newList() {
        let things = makeGrid();
        let thingsInGrid = [];
        things.map((item, index) => {
            if (item == "leaf") {
                thingsInGrid.push(<Leaf key={index.toString()} onLeafPick={ this.onLeafPick }/>);
            }
            else {
                thingsInGrid.push(<CrispPacket key={index.toString()} onPickUp={ this.onPickUp }/>);
            }
        });
        this.setState({grid: thingsInGrid});
    }

    render() {
        setInterval(this.newList, 500);

        return (
			<div className="App">
				<BinBag score={this.state.score}/>
				<p>Hello {this.props.name} can you complete this task?</p>
				<div className="grid">
                    {this.state.grid}
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