import React from 'react';

class WeatherIcon extends React.Component{
    getWeatherIcon(main) {
        if (main == 'Clear') {
            return {
                icon: 'sun',
                color: '#fff'
            }
        }
    
        if (main == 'Clouds' || main == 'Mist' || main == 'Smoke' || main == 'Haze' || main == 'Dust' || main == 'Fog' || main == 'Sand'|| main == 'Ash' || main == 'Squall'|| main == 'Tornado') {
            return {
                icon: 'cloud',
                color: '#fff'
            }
        }
        if (main == 'Rain') {
            return {
                icon: 'cloud-rain',
                color: '#fff'
            }
        }
        if (main == 'Snow') {
            return {
                icon: 'cloud-snow',
                color: '#fff'
            }
        }
        if (main == 'Drizzle') {
            return {
                icon: 'cloud-drizzle',
                color: '#fff'
            }
        }
        if (main == 'Thunderstorm') {
            return {
                icon: 'cloud-lightning',
                color: '#fff'
            }
        }
    }
}
export default WeatherIcon;