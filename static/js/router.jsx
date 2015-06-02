import routes from './routes.jsx';
import {
  create as createRouter,
  HistoryLocation,
  HashLocation
} from 'react-router';


export default createRouter({ routes, HistoryLocation });
