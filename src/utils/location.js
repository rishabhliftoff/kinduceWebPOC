import { getMobileOperatingSystem } from './userDeviceInfo';

const getCurrentLocation = (cb) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log('dbg current location: ', { latitude, longitude });
      cb(null, { latitude, longitude });
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
      cb(err);
    });
  } else {
    const err = 'Geolocation is not supported by this browser.';
    cb(err);
  }
};

export {
  getCurrentLocation,
};
