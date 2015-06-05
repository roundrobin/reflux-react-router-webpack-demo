/*
 *
 * `routes.jsx` 
 *
 * Defines the available URL routes in this single page application (SPA). It uses
 * the battle-tested `react-router` component, which allows all the rounting 
 * defintions via a declarative set of custom tags. Those tags (ex: <Route>)
 * can be nested to be able to implement master/detail views.
 *
 */
//==============================================================================
// External dependencies
//==============================================================================
import React from 'react';
import { Route, DefaultRoute,  NotFoundRoute} from 'react-router';
//==============================================================================
// Internal dependencies
//==============================================================================
import AppHandler from './components/AppHandler.jsx';
import RoomListMaster from './components/RoomListMaster.jsx';
import HomeView from './components/Home.jsx';
import NotFoundView from './components/NotFound.jsx';
import RoomsDetailView from './components/RoomDetail.jsx';
import NoRoomSelectedDetail from './components/NoRoomSelectedDetail.jsx';
//==============================================================================
// Module definition
//==============================================================================
let Routes = (
    <Route name="app" path="/" handler={AppHandler}>
  	<Route name="home" path="/" handler={HomeView} />

  	<Route handler={RoomListMaster}>
	    <Route name="listViewRooms" path="/list/popular" handler={NoRoomSelectedDetail} />
    	<Route name="roomsDetail" path="/room/:roomSlug" handler={RoomsDetailView} />
  	</Route>    
  	
    <NotFoundRoute handler={NotFoundView}/>
  </Route>
);

export default Routes;
