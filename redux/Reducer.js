import WeatherService from '../services/Weather-services';

const initialStateWeather = {
    serv : new WeatherService(console.log("new weather service")),
};

const initialStateCities = {
    cities : []
}


export const storageReducer = (state = initialStateCities, action) =>{
    switch(action.type){
        case 'GET_CITIES':
            return(
                state
            );
    }
    return state;
};



const rootReducer = (state = initialStateWeather, action) => {
    switch(action.type){
        case 'WEATHER_SERV':
            return(
                state.serv
            );
    }
    return state;
};

export default rootReducer;
