import React from 'react';
import {StatusBar,SafeAreaView,View,Text,Pressable} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './src/store/reducers/root_reducer/root.reducer';
import Navigator from './src/navigation/index';

const App = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <>
      <StatusBar backgroundColor={'#1481D0'} barStyle={'dark-content'} />
      <Provider store={store}>
      <Navigator/>
      </Provider>
    </>
  );
};


export default App;
