import React from 'react';
import ReactDOM from'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Grid from './js/components/Grid';
import {StyleRoot} from 'radium';

ReactDOM.render((
		<Router history={hashHistory}>
			<Route path="/" component={Grid}/>
 		</Router>
	), document.getElementById('app')
);
