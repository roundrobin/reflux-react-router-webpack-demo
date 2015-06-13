/*
 *
 * `router.jsx` 
 *
 * Creates a HoC (Higher-order component) via the react-router library to 
 * support routing in our single page application.
 *
 */

 //==============================================================================
// External dependencies
//==============================================================================

import {
  create as createRouter,
  HistoryLocation,
  HashLocation
} from 'react-router';

//==============================================================================
// Internal dependencies
//==============================================================================
import routes from './routes.jsx';
//==============================================================================
// Module definition
//==============================================================================
export default createRouter({ routes, HistoryLocation });


//// NOTE: To create the router without hashes in the URL, use:
//export default createRouter({
    //routes: routes, 
    //location: HistoryLocation
//});
//// NOTE: If NOT using hashes, server must support the route
