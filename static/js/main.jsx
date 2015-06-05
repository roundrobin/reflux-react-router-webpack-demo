/*
 *
 * `main.jsx` 
 *
 * main.jsx kicks of the rendering of this react.js demo app. Webpack compiles
 * all it's dependencies to a file called bundle.js.
 *
 * This file is also responsible for transcompiling the scss file (see main.scss
 * as an entry point) to CSS.
 * 
 * The initialization phase of the app start with a ajax call to demo how those are 
 * integrated in a React/Flux app.
 *
 */
//------------------------------------------------------------------------------
// External dependencies
//------------------------------------------------------------------------------
import React from 'react';
import logger from 'bragi-browser';
//------------------------------------------------------------------------------
// Internal dependencies
//------------------------------------------------------------------------------
import WebAPIUtils from './utils/WebAPIUtils.js';
import AsyncActionCreator from './actions/AsyncActionCreator.js';
import router from './router.jsx';
import  '../css/main.scss'; // Builds the main CSS file!
//------------------------------------------------------------------------------
// Config
//------------------------------------------------------------------------------
const rootEl = document.getElementById('main');
//------------------------------------------------------------------------------
// Module definition
//------------------------------------------------------------------------------
logger.log("main", "start rendering the app...", );

AsyncActionCreator.loadRooms()
    
router.run((Handler, state) =>{
	React.render(
	  <Handler {...state}/>, rootEl
	);	
});
