//==============================================================================
// External dependencies
//==============================================================================
import React from 'react';
//==============================================================================
// Internal dependencies
//==============================================================================
import WebAPIUtils from './utils/WebAPIUtils.js';
import AsyncActionCreator from './actions/AsyncActionCreator.js';
import logger from 'bragi-browser';

import router from './router.jsx';
import  '../css/main.scss'; // Builds our CSS file!
//==============================================================================
// Config
//==============================================================================
const rootEl = document.getElementById('main');

//==============================================================================
// Module definition
//==============================================================================
logger.log("main", "called...", );

AsyncActionCreator.loadRooms()
    
router.run((Handler, state) =>{
	React.render(
	  <Handler {...state}/>, rootEl
	);	
});
