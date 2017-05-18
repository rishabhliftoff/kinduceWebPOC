import React, { Component } from 'react';

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
      <div className="geoLocation__container" >
        {
          this.state.latitude && this.state.longitude &&
          <div className="info">
            Latitude: {this.state.latitude}
            <br />
            Longitude: {this.state.longitude}
          </div>
        }
        <button className="btn" onClick={this.getUserCurrentLocation}>
          Get Current Location
        </button>
        {this.state.error && <div>this.state.error</div>}
      </div>
    );
  }
}

export default geoLocationContainer;
