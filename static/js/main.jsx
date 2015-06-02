//==============================================================================
// External dependencies
//==============================================================================
import React from 'react';
import FluxComponent from 'flummox/component'
//==============================================================================
// Internal dependencies
//==============================================================================
import router from './router.jsx';
import  '../css/main.scss'; // Builds our CSS file!
import Flux from './Flux';
//==============================================================================
// Config
//==============================================================================
const rootEl = document.getElementById('main');
let flux = new Flux();

//==============================================================================
// Module definition
//==============================================================================

router.run((Handler, state) =>{
	React.render(
	  <FluxComponent flux={flux}><Handler {...state}/></FluxComponent>, rootEl
	);	
});
