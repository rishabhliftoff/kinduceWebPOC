import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const errorMiddleware = store => next => (action) => {
  if (action.data && action.data.error) {
    if (action.data.statusCode === 401 && action.data.message !== 'Invalid credentials.') {
      store.dispatch({
        type: 'LOGOUT',
      });
    } else {
      store.dispatch({
        type: 'SHOW_GLOBAL_ERROR',
        msg: action.data.message,
      });
    }
  }
  // global error on form submit
  if (action.error && action.type === '@@redux-form/SET_SUBMIT_FAILED') {
    store.dispatch({
      type: 'SHOW_GLOBAL_ERROR',
      msg: 'Oops there seems to be an issue, please fix the fields marked in red',
    });
  }
  // on update sync errors
  if (action.type === '@@redux-form/UPDATE_SYNC_ERRORS') {
    const obj = action.payload.syncErrors;
    if (!Object.keys(obj).length) {
      store.dispatch({
        type: 'HIDE_GLOBAL_ERROR',
      });
    } else if (!obj[Object.keys(obj)[0]].length) {
      store.dispatch({
        type: 'HIDE_GLOBAL_ERROR',
      });
    }
  }
  // on form destroy
  if (action.type === '@@redux-form/DESTROY') {
    store.dispatch({
      type: 'HIDE_GLOBAL_ERROR',
    });
  }
  next(action);
};

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  /* eslint-disable no-underscore-dangle */
  let composeEnhancers = compose;
  if (typeof (window) !== 'undefined') {
    composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  }
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, errorMiddleware)),
  );
  /* eslint-enable */
  sagaMiddleware.run(rootSaga);
  return store;
}
