import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './navigation/AppNavigator';
import { CreateAppContainer } from 'react-navigation';
import {createStore} from 'redux';
import { Provider } from 'react-native-paper';
import rootReducer from './redux/Reducer';

const store = createStore(rootReducer);

class App extends React.Component {

  
  render(){

    return (
      <Provider store = {store}>
        <AppContainer/>  
      </Provider>
    );
  }
}



export default App; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
