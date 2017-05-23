import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Notification, NotificationList } from '../components';

import { NotificationActions } from '../actions';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotificationList: false,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onNotificationClick = this.onNotificationClick.bind(this);
  }
  componentWillMount() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('4c6aba2e7cad38b7215c', {
      cluster: 'ap2',
      encrypted: true,
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('notification', (data) => {
      this.props.notificationUpdate(data.newNotifications);
    });

    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  onNotificationClick() {
    if (this.state.showNotificationList) {
      this.props.notificationClear();
    }

    this.setState({ showNotificationList: !this.state.showNotificationList });
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if ((!domNode || !domNode.contains(event.target))) {
      if (this.state.showNotificationList) {
        this.setState({
          showNotificationList: false,
        });
        this.props.notificationClear();
      }
    }
  }

  render() {
    return (
      <div className="notification__container" onClick={this.onNotificationClick}>
        <Notification notificationCount={this.props.notifications.size} />
        {
          this.state.showNotificationList &&
          <NotificationList notifications={this.props.notifications} />
        }
      </div>
    );
  }
}

const mapStateToProps = state =>
   ({
     notifications: state.get('notification'),
   })
;

export default connect(mapStateToProps, { ...NotificationActions })(NotificationContainer);
