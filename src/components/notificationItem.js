import React from 'react';

const NotificationItem = (props) => {
  return (
    <div className="notification__item">
      <div className="notification__item__name">
        {props.notification.get('name')}
      </div>
      <div className="notification__item__content">
        {props.notification.get('message')}
      </div>
    </div>
  )
}

export default NotificationItem;
