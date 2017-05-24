import React, { Component } from 'react';
import { getCurrentLocation } from '../utils/location';

class CreateFence extends Component {
  componentDidMount() {
    let polygons = [];

    let clatitude = 12.9363416;
    let clongitude = 77.6278994;

    getCurrentLocation((err, ltln) => {
      if (err) {
        err += ' Using default location for creating fence.';
        this.props.setError(err);
      } else {
        clatitude = ltln.latitude;
        clongitude = ltln.longitude;
      }

      const map = new google.maps.Map(document.getElementById('map_create-fence'), {
        center: {
          lat: clatitude,
          lng: clongitude,
        },
        zoom: 18,
      });

      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['polygon'],
        },
        circleOptions: {
          fillColor: '#ffff00',
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });
      drawingManager.setMap(map);

      map.addListener('click', () => {
        this.props.clearError();
      });

      google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        console.log('dbg polygon added: ', polygon);
        polygons.push(polygon);
        console.log('dbg coordinates: ', polygon);
      });

      this.clearMap.addEventListener('click', () => {
        console.log('dbg on clear: ', polygons);
        polygons.forEach((p) => {
          p.setMap(null);
        });
        polygons = [];
        this.props.clearError();
      });

      this.setLocation.addEventListener('click', () => {
        this.props.setLocation(polygons);
      });
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    this.clearMap.removeEventListener('click');
  }

  render() {
    return (
      <div>
        <div id="map_create-fence" className="create-fence__map" />
        <div className="mt10">
          <button ref={elem => this.clearMap = elem} id="map_create-fence_clear" className="btn" >
            Clear Map
          </button>
          <button ref={elem => this.setLocation = elem} className="btn ml10">
            Set Location
          </button>
          <button onClick={this.props.resetLocations} className="btn ml10 mt10">
            reset all Locations
          </button>
        </div>
      </div>
    );
  }
}

export default CreateFence;
