import WeatherService from '../services/Weather-services';
import {AsyncStorage } from 'react-native';

const initialStateWeather = {
    serv: new WeatherService(console.log("new weather service")),
};

const initialStateCities = {
    cities: []
}


export const storageReducer = (state = initialStateCities, action) => {
    switch (action.type) {
        case 'ADD_CITIES':
            state.cities.push(action.cityName)
            AsyncStorage.setItem('cities', JSON.stringify(state.cities)).then(() => {

            }).catch((err) => {
                alert(err)
            })

            break;
        case 'GET_CITIES':
            AsyncStorage.getItem('cities').then((data) => {
                state.cities = JSON.parse(data).sort();
            }).catch((err) => {
                alert(err)
            });
            return (state.cities);
    }
    return state;
};



const weatherReducer = (state = initialStateWeather, action) => {
    switch (action.type) {
        case 'WEATHER_SERV':
            return (
                state.serv
            );
    }
    return state;
};

export default weatherReducer;
