import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import WeatherService from '../services/Weather-services';
import {getWeatherService} from './Action';
import { createStore } from 'redux';


//ACTIONS
const increment = () =>{
    return{
        type : 'INCREMENT'
    }
}
const decrement = () =>{
    return{
        type : 'DECREMENT'
    }
}

//REDUCER 
const counter = (state = 0,action) =>{
    switch(action.type){
        case "INCREMENT":{
            return state +1
        }
        case "DECREMENT":{
            return state -1
        }
    }
}

let store = createStore(counter);

store.subscribe(()=> console.log(store.getState()));

store.dispatch(increment);
