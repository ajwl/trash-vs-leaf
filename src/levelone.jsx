import React from 'react';
import ReactDOM from 'react-dom';

const NUMBERITEMS = 6;

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
        <div className="scorebox">
            <div className="last-score">
                <p>Score to beat:</p>
                <span>{props.lastscore}</span>
            </div>
            <div className="binbag">
                <div>
                    <span className="big-number">{props.score}</span>
                </div>
            </div>
        </div>
    )
};
BinBag.propTypes = {
	score: React.PropTypes.number.isRequired,
    lastscore: React.PropTypes.number.isRequired
};

function ResultBox(props){
    let results;
    if(props.numbergames > 0) {
        results = props.lastscore < 3 ?
            <span className="bad">Do you even care?!?!?</span>
            :
            <span className="good">This is a good score. Take pride in your achievements</span>
    }
    else { results = <span></span>; }
    return (
        <div className="result-msg">
            <p>
                { results }
            </p>
        </div>
    )
};
ResultBox.propTypes = {
    lastscore: React.PropTypes.number.isRequired,
    numbergames: React.PropTypes.number.isRequired
};


class StopWatch extends React.Component {
    constructor(props){
        super(props);
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
    running: React.PropTypes.bool.isRequired,
};

class LevelOne extends React.Component {

   constructor(props){
       super(props);
       this.state = { score: 0, trash: 0, running: false, elapsed: 0, lastscore: 0, numbergames: 0 };

       this.onPickUp = this.onPickUp.bind(this);
       this.indexOfTrash = this.indexOfTrash.bind(this);
       this.onStart = this.onStart.bind(this);
       this.onTick = this.onTick.bind(this);
       this.onStop = this.onStop.bind(this);
       this.scoreReset = this.scoreReset.bind(this);
    }

    onStart(){
        this.setState({running: true});
    }

    onTick(){
        if(this.state.running === true){
            if(this.state.elapsed < 30){
                this.state.elapsed += 1;
                this.setState({ elapsed: this.state.elapsed });
            }
            else{
                this.onStop();
                this.scoreReset();
            }
        }
    }

    onStop(){
        this.setState({
            running: false,
            elapsed: 0
        });
    }

    scoreReset(){
        if(this.state.running === false){
            this.state.numbergames +=1;

            this.setState({
                lastscore: this.state.score,
                score: 0,
                numbergames: this.state.numbergames
            });
        }
    }

    indexOfTrash(){
        if(this.state.running) {
            let rando = Math.floor(Math.random() * NUMBERITEMS);
            this.setState({trash: rando});
        }
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

    componentDidMount(){
        this.interval = setInterval(this.onTick, 1000);
        this.interval2 = setInterval(this.indexOfTrash, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        clearInterval(this.interval2);
    }

    render() {
        return (
			<div className="App">
                <p>Hello {this.props.name} can you complete this task?</p>
                <ResultBox numbergames={this.state.numbergames} lastscore={this.state.lastscore}/>
				<BinBag score={this.state.score} lastscore={this.state.lastscore} />
                <StopWatch elapsed={this.state.elapsed} onStart={this.onStart} running={this.state.running}/>
                <GameGrid running={this.state.running} trash={this.state.trash} onPickUp={this.onPickUp}/>
			</div>
        )
    }
};

LevelOne.propTypes = {
    name: React.PropTypes.string,
    score: React.PropTypes.number
};

export default LevelOne

// ReactDOM.render(<LevelOne name="challenger" />, document.getElementById("root"));
