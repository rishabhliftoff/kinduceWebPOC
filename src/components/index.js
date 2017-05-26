import { asyncComponent } from 'react-async-component';

const Notification = asyncComponent({ resolve: () => System.import('./notification') });
const NotificationList = asyncComponent({ resolve: () => System.import('./notificationList') });
const Header = asyncComponent({ resolve: () => System.import('./header') });
const GeoLocation = asyncComponent({ resolve: () => System.import('./geoLocation') });
const CreateFence = asyncComponent({ resolve: () => System.import('./createFence') });
const Calendar = asyncComponent({ resolve: () => System.import('./calendar') });

export {
  Notification,
  NotificationList,
  Header,
  GeoLocation,
  CreateFence,
  Calendar,
};
