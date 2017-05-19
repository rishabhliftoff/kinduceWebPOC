import { asyncComponent } from 'react-async-component';

const Notification = asyncComponent({ resolve: () => System.import('./notification') });
const NotificationList = asyncComponent({ resolve: () => System.import('./notificationList') });
const Header = asyncComponent({ resolve: () => System.import('./header') });
const GeoLocation = asyncComponent({ resolve: () => System.import('./geoLocation') });

export {
  Notification,
  NotificationList,
  Header,
  GeoLocation,
};
