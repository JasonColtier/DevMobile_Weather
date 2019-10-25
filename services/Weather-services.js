import axios from 'axios';

const key='245a60820ad2eb207b25f8dd5fa4b5a0';
//const key='7ddda14d05ce22635728e40e5ecb68da';
const url=`http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric`;

class WeatherService{
   

    getWeatherHome(ville){//retourne un bel objet weather
       
        return( axios.get(`${url}&q=${ville}`));
        
        //retourne une promise (=un engagement à envoyer les données) + prévenir quand c'est fait
       

        /*
        return {
            weather:{
                main:'clear',
                description:"Il fait beau aujourd'hui",
            },
            main:{
                temp:'13',
                temp_min:'11',
                temp_mac:'21',
                humidity:'80',
                pressure:'1009'
            },
            wind:{
                speed:'20'
            },
            sys:{
                sunrise:'156028377',
                sunset:'1560333478'
            },
            name:'Nanterre'
            

        };
        */
    }
}

export default WeatherService;