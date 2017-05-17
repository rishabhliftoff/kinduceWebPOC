import {
  APP_DEFAULT_ACTION,
} from './actionTypes';

export function defaultAction(someDefaultId) {
  return {
    type: APP_DEFAULT_ACTION,
    data: someDefaultId,
  };
}
