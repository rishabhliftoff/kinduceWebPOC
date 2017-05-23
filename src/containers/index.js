import { asyncComponent } from 'react-async-component';
import RootContainer from './RootContainer';
import AppContainer from './AppContainer';
// import Notification from './NotificationContainer';
const Notification = asyncComponent({ resolve: () => System.import('./NotificationContainer') });


export {
  RootContainer,
  AppContainer,
  Notification,
  // Header,
};
