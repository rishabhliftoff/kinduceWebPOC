import React, { Component } from 'react';
import axios from 'axios';
import { GeoLocation } from '../components';
import { getMobileOperatingSystem } from '../utils/userDeviceInfo';

class GeoLocationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      area: null,
    };

    this.getUserCurrentLocation = this.getUserCurrentLocation.bind(this);
  }

  getUserCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        axios.post('/checkLocation', { lat: latitude, lng: longitude })
          .then((response) => {
            if (response.data.success) {
              this.setState({
                area: response.data.areaId,
              });
            } else {
              this.setState({
                area: 'not found',
              });
            }
          })
          .catch((error) => {
            this.setState({
              area: 'not found due to some server error',
            });
          });
        this.setState({
          latitude,
          longitude,
          error: null,
        });
      }, (error) => {
        let err;
        switch (error.code) {
          case error.PERMISSION_DENIED: {
            err = 'User denied the request for Geolocation.';
            const OS = getMobileOperatingSystem();
            if (OS === 'iOS') {
              err += ' Please allow the browser to access geolocation through Settings > Privacy > Location Services > browser';
            } else {
              err += ' Please allow the browser to access geolocation through browser settings.';
            }
            break;
          }
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
      <div>
        <GeoLocation
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            error={this.state.error}
            getUserCurrentLocation={this.getUserCurrentLocation}
        />
        {
          this.state.area &&
          <div className="info">
            the area is {this.state.area}
          </div>
        }
      </div>
    );
  }
}

export default GeoLocationContainer;
