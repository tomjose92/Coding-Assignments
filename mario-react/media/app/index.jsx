import React from 'react';
import ReactDOM from'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Grid from './js/components/Grid';
import {Provider} from 'react-redux';
//import configureStore from './js/store/store';
//var  harddiskBrowserStore = configureStore();
import {StyleRoot} from 'radium';

ReactDOM.render((
	<StyleRoot>
	
		<Router history={hashHistory}>
			<Route path="/" component={Grid}/>
 	   </Router>
 	
 	</StyleRoot>
	), document.getElementById('app')
);
