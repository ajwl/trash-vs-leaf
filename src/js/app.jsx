import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Import custom components
import LevelOne from './levelone.jsx'


ReactDOM.render(
    <Router history={HashHistory}>
        <Route path="/" component={Greeting} />
        <Route path="/levelone" component={LevelOne} />
        <Route path="/leveltwo" component={LevelTwo} />
    </Router>,
    document.getElementById("root")
);

const Greeting = () => <h1>Hello greetings</h1>
const LevelTwo = () => <h1>Level 2 is here</h1>

// ReactDOM.render(<LevelOne name="challenger" />, document.getElementById("root"));

export default App