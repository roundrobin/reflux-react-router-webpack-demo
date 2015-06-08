/*
 *
 * `router.jsx` 
 *
 * Creates a HoC (Higher-order component) via the react-router library to 
 * support routing in our single page application.
 *
 */
import routes from './routes.jsx';
import {
  create as createRouter,
  HistoryLocation,
  HashLocation
} from 'react-router';


export default createRouter({ routes, HistoryLocation });
