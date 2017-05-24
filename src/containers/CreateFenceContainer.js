import React, { Component } from 'react';
import axios from 'axios';
import { CreateFence } from '../components';

class CreateFenceContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      success: null,
    }

    this.setLocation = this.setLocation.bind(this);
    this.clearError = this.clearError.bind(this);
    this.setError = this.setError.bind(this);
    this.resetLocations = this.resetLocations.bind(this);
  }

  setLocation(polygons) {
    if (polygons.length <= 0) {
      this.setState({
        error: 'Please set at least one area',
        success: null,
      });
      return;
    }

    if (polygons.length > 1) {
      this.setState({
        error: 'Please set only one area',
        success: null,
      });
      return;
    }

    console.log('dbg len: ', polygons.length);

    const polygon = [];
    const polygonBounds = polygons[0].getPath();
    // Iterate over the polygonBounds vertices.
    polygonBounds.forEach((xy) => {
      const pos = {
        lat: xy.lat(),
        lng: xy.lng(),
      };
      polygon.push(pos);
      console.log('dbg pos: ', pos);
    });

    axios.post('/setLocation', polygon)
      .then((response) => {
        console.log(response);
        this.setState({
          error: null,
          success: `the area is set as ${response.data.areaId}`,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: 'area could not be set',
          success: null,
        });
      });
  }

  setError(err) {
    this.setState({
      error: err,
      success: null,
    });
  }

  clearError() {
    this.setState({
      error: null,
      success: null,
    });
  }

  resetLocations() {
    axios.get('/resetLocations')
      .then((response) => {
        console.log(response);
        this.setState({
          error: null,
          success: 'all locations are resetted',
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: 'area could not be resetted',
          success: null,
        });
      });
  }

  render() {
    return (
      <div className="mt10">
        <CreateFence
            setLocation={this.setLocation}
            clearError={this.clearError}
            setError={this.setError}
            resetLocations={this.resetLocations}
        />
        {
          this.state.error &&
          <div className="error">
            {this.state.error}
          </div>
        }
        {
          this.state.success &&
          <div className="info">
            {this.state.success}
          </div>
        }
      </div>
    );
  }
}

export default CreateFenceContainer;
