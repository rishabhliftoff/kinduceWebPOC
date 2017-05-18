import React from 'react';
import NotificationItem from './notificationItem';

const NotificationList = (props) => {
  return (
    <div className="notification__list" >
      {props.notifications && props.notifications.map( notification => <NotificationItem key={notification.get('id')} notification={notification} /> )}
    </div>
  )
}

export default NotificationList;
