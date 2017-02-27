import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Import custom components
import LevelOne from './levelone.jsx'
import LevelTwo from './leveltwo.jsx'
import Greeting from './greeting.jsx'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Greeting} />
        <Route path="/levelone" component={LevelOne} />
        <Route path="/leveltwo" component={LevelTwo} />
    </Router>,
    document.getElementById("root")
);

