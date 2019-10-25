import rootReducer from './Reducer';
import {storageReducer} from './Reducer';
import { createStore, combineReducers } from 'redux';


const store = createStore(
    combineReducers({
        rootReducer,
        storageReducer
    })
);



export default store;