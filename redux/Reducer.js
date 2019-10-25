import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import WeatherService from '../services/Weather-services';
import {getWeatherService} from './Action';


const initialState = {
    citiesList : [],
    // serv = new WeatherService(),
};

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'ADD_CITIES':
            state.citiesList.push(action.city);
        case 'WEATHER_SERV':
            return(
                state.serv
            );
    }
    return state;
};

export default store;