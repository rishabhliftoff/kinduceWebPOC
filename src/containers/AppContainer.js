import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';
import { fetchState } from 'react-router-server';

import {
  Header,
  Calendar,
} from '../components';

import Notification from './NotificationContainer';
import GeoLocation from './geoLocationContainer';
import CreateFence from './CreateFenceContainer';

import { Urls } from '../helpers';


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
          <Match exactly pattern={Urls.base()} component={GeoLocation} />
          <Match exactly pattern={Urls.selectDates()} component={Calendar} />
          <Match exactly pattern={Urls.selectArea()} component={CreateFence} />
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
