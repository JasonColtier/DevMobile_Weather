import WeatherService from '../services/Weather-services';

const initialState = {
    citiesList : [],
    serv : new WeatherService(console.log("new weather service")),
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'WEATHER_SERV':
            return(
                state.serv
            );
    }
    return state;
};

export default rootReducer;