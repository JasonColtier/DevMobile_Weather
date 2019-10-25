import weatherReducer from './Reducer';
import {storageReducer} from './Reducer';
import { createStore, combineReducers } from 'redux';


const store = createStore(
    combineReducers({
        weatherReducer,
        storageReducer
    })
);



export default store;