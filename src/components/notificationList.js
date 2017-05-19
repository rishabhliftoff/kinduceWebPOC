import React from 'react';
import NotificationItem from './notificationItem';

const NotificationList = (props) => {
  let list = (
    <NotificationItem error={"No Notifications"} />
  );

  if (props.notifications.size > 0) {
    list = props.notifications.map( notification => <NotificationItem key={notification.get('id')} notification={notification} /> )
  }

  return (
    <div className="notification__list" >
      {list}
    </div>
  )
}

export default NotificationList;
