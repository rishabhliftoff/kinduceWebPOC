import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';

import {
  Header,
  HeaderRightSection,
} from '../components';

import Notification from './NotificationContainer';

@fetchState(
  () => ({}),
  actions => ({
    done: actions.done,
  }),
)
class AppContainer extends Component {

  componentWillMount() {
    const { notifications } = this.props;
    this.props.done({
      notification: { notifications },
    });
  }

  render() {
    // here routers will come
    return (
      <Header>
        Kinduce
        <Notification />
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.getIn(['notification','notifications'])
  }
}

export default connect(mapStateToProps)(AppContainer);
