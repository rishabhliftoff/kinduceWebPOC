import React, { Component } from 'react';
import { GeoLocation } from '../components';

class geoLocationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null
    }

    this.getUserCurrentLocation = this.getUserCurrentLocation.bind(this);
  }

  getUserCurrentLocation() {
    if ("geolocation" in window.navigator) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        this.setState({
          latitude,
          longitude,
          error: null
        });
      });
    } else {
      this.setState({
        latitude: null,
        longitude: null,
        error: 'unable to get geolocation'
      })
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
