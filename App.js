import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import * as firebase from 'firebase';
import rootReducer from './src/redux/rootReducer';
import RoutingAndroid from './src/authentication/AuthRouting/index.android';

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

const firebaseConfig = {
  // Config for firebase
};

firebase.initializeApp(firebaseConfig);

const Routing = Platform.select({
  android: () => <RoutingAndroid />,
});

const App = () => (
  <Provider store={store}>
    <Routing />
  </Provider>
);

export default App;
