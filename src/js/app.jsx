import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Import custom components
import LevelOne from './levelone.jsx'

const Greeting = () => <h1>Hello greetings</h1>;
const LevelTwo = () => <h1>Level 2 is here</h1>;


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Greeting} />
        <Route path="/levelone" component={LevelOne} />
        <Route path="/leveltwo" component={LevelTwo} />
    </Router>,
    document.getElementById("root")
);

