import { asyncComponent } from 'react-async-component';
import RootContainer from './RootContainer';
import AppContainer from './AppContainer';

const Notification = asyncComponent({ resolve: () => System.import('./NotificationContainer') });
const CreateFence = asyncComponent({ resolve: () => System.import('./CreateFenceContainer') });
const GeoLocation = asyncComponent({ resolve: () => System.import('./geoLocationContainer') });

export {
  RootContainer,
  AppContainer,
  Notification,
  CreateFence,
  GeoLocation,
  // Header,
};
