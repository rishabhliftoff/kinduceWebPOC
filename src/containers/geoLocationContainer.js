import React, { Component } from 'react';
import { GeoLocation } from '../components';
import { getMobileOperatingSystem } from '../utils/userDeviceInfo';

class geoLocationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };

    this.getUserCurrentLocation = this.getUserCurrentLocation.bind(this);
  }

  getUserCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.setState({
          latitude,
          longitude,
          error: null,
        });
      }, (error) => {
        console.log('geolocation error: ', error);
        let err;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            err = 'User denied the request for Geolocation.';
            const OS = getMobileOperatingSystem();
            if (OS === 'iOS') {
              err += ` Please allow the browser to access geolocation through Settings > Privacy > Location Services > browser`;
            } else {
              err += ' Please allow the browser to access geolocation through browser settings.';
            }
            break;
          case error.POSITION_UNAVAILABLE:
            err = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            err = 'The request to get user location timed out.';
            break;
          case error.UNKNOWN_ERROR:
            err = 'An unknown error occurred.';
            break;
          default:
            err = 'Unable to get geolocation.';
        }

        this.setState({
          latitude: null,
          longitude: null,
          error: err,
        });
      });
    } else {
      this.setState({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by this browser.',
      });
    }
  }

  render() {
    return (
      <GeoLocation
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          error={this.state.error}
          getUserCurrentLocation={this.getUserCurrentLocation}
      />
    );
  }
}

export default geoLocationContainer;
