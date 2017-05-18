import React from 'react';

const NotificationItem = (props) => {
  const { name, content } = props.notification;

  return (
    <div className="notification__item">
      <div className="notification__item__name">
        {name}
      </div>
      <div className="notification__item__content">
        {content}
      </div>
    </div>
  )
}

export default NotificationItem;
