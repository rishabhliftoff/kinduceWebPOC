import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  // Creates the Redux store using our reducer and the logger and saga middlewares
  // let store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))
  // We run the root saga automatically
  sagaMiddleware.run(rootSaga);
  return store;
}
