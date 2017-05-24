import React from 'react';

const geoLocation = (props) => {
  const { latitude, longitude, error, getUserCurrentLocation } = props;
  return (
    <div className="geoLocation__container" >
      {
        latitude && longitude &&
        <div className="info">
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </div>
      }
      <button className="btn mt10" onClick={getUserCurrentLocation}>
        Get Current Location
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default geoLocation;
