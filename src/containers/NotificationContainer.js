import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Notification, NotificationList } from '../components';

import { NotificationActions } from '../actions';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotifications: false
    }
  }
  componentWillMount() {
    setTimeout(
      this.props.notificationChange([
        {
          id: 2,
          name: 'abc',
          content: 'sfdsfssf sdfnjsfsf sdlfksdf sdlkfsd'
        },
        {
          id: 3,
          name: 'bsd',
          content: 'lorem ipsum sfasa fsfhkkfd lfsd'
        },
        {
          id: 4,
          name: 'qac',
          content: 'sfdss dfmoku uioi uoiu jk dlkfsd'
        }
      ]),
      30000
    );

    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  handleClickOutside(event) {
      const domNode = ReactDOM.findDOMNode(this);

      if ((!domNode || !domNode.contains(event.target))) {
          this.setState({
              showNotifications : false
          });
      }
  }

  render() {
    return (
      <div className="notification__container" onClick={() => this.setState({showNotifications: !this.state.showNotifications})}>
        <Notification notificationCount={this.props.notifications.length} />
        {
          this.state.showNotifications &&
          <NotificationList notifications={this.props.notifications} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.getIn(['notification','notifications'])
  }
}

export default connect(mapStateToProps, { ...NotificationActions } )(NotificationContainer);
