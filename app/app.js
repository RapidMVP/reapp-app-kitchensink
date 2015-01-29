import 'reapp-ui';
import Router from 'reapp-routes/react-router';
import Routes from './routes';

import './phantom';

// import our theme
require('./theme/theme');

// run the app
export default Router(Routes);