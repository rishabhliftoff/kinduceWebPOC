import React from 'react';

const NotificationItem = (props) => {
  let content = (
    <div>
      {props.error || 'No Notification'}
    </div>
  );

  if (props.notification) {
    content = (
      <div>
        <div className="notification__item__name">
          {props.notification.get('name')}
        </div>
        <div className="notification__item__content">
          {props.notification.get('message')}
        </div>
      </div>
    );
  }

  return (
    <div className="notification__item">
      {content}
    </div>
  )
}

export default NotificationItem;
