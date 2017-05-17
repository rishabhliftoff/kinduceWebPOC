import { Map, fromJS } from 'immutable';
import {
  APP_DEFAULT_ACTION,
} from '../actions/actionTypes';

const initialState = Map({
  
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
