import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';

import {
  Header,
  Calendar,
} from '../components';

import Notification from './NotificationContainer';
import GeoLocation from './geoLocationContainer';
import CreateFence from './CreateFenceContainer';

@fetchState(
  () => ({}),
  actions => ({
    done: actions.done,
  }),
)
class AppContainer extends Component {

  componentWillMount() {
    const { notification } = this.props;
    this.props.done({
      notification,
    });
  }

  render() {
    // here routers will come
    return (
      <div>
        <Header>
          Kinduce
          <Notification />
        </Header>
        <div className="main">
          <Calendar />
          <GeoLocation />
          <CreateFence />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>
   ({
     notification: state.notification,
   })
;

export default connect(mapStateToProps)(AppContainer);
