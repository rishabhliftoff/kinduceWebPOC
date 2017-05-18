import React from 'react';

const Notification = (props) => {
  return (
    <div className="notification__bell-container">
      <i className="fa fa-bell" aria-hidden="true"></i>
      {
        props.notificationCount > 0 &&
        <div className="notification__count">
          {props.notificationCount}
        </div>
      }
    </div>
  )
}

export default Notification;
