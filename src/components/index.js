import { asyncComponent } from 'react-async-component';

const Notification = asyncComponent({ resolve: () => System.import('./notification') });
const NotificationList = asyncComponent({ resolve: () => System.import('./notificationList') });
const Header = asyncComponent({ resolve: () => System.import('./header') });
const HeaderRightSection = asyncComponent({ resolve: () => System.import('./headerRightSection') });

export {
  Notification,
  NotificationList,
  Header,
  HeaderRightSection,
};
