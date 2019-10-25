import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import WeatherService from '../services/Weather-services';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../uiStyle/Colors';
import Loading from '../components/Loading';
import Styles from '../uiStyle/Styles';
import { NavigationEvents } from 'react-navigation';
import WeatherIcon from '../uiStyle/WeatherIcon'


class HomePage extends React.Component {

    serv = new WeatherService();

    //on utilise setState pour mettre à jour, ce qui enclanche le didMount
    state = {
        weather: null,
        cities: [],

    }


    //se fait après le render
    componentDidMount() {

        this.refresh();
    }

    refresh() {
        this.props.navigation.addListener('didFocus', () =>
            AsyncStorage.getItem('currentFavorite').then((data) => {

                this.serv.getWeatherHome(JSON.parse(data)).then((resp) => {
                    this.setState({ weather: resp.data });

                }).catch(
                    // console.log('pas de données trouvées')
                )
            }).catch((err) => {
                alert(err)
            })
        );
    }


    SunTime(time){
        const dt = new Date(time * 1000);
        return (
            <Text>{dt.getHours() + ((this.state.weather.timezone / 60) / 60) - 2}:{dt.getMinutes()}</Text>
        )
    }

    render() {
        //alert('render', this.weather);
        return (
            (this.state.weather != null) ? (//si on a les données
                <NavigationEvents onDidFocus={this.refresh()}></NavigationEvents>,
                <LinearGradient colors={[Colors[this.state.weather.weather[0].main].colorGradient1, Colors[this.state.weather.weather[0].main].colorGradient2]} style={{ flex: 1 }}>

                    {/* view horizontale avec les soleils */}
                    <View style={[{ flex: 2, flexDirection: 'row' }, Styles.center]}>

                        {/* sunrise */}
                        <View style={[{ flex: 3 }, Styles.center]}>
                            <FeatherIcon size={30} color={'#ffe5c9'} name="sunrise"></FeatherIcon>
                            <Text>{this.SunTime(this.state.weather.sys.sunrise)}</Text>
                        </View>
                        
                        <FeatherIcon size={150} color={new WeatherIcon().getWeatherIcon(this.state.weather.weather[0].main).color} name={new WeatherIcon().getWeatherIcon(this.state.weather.weather[0].main).icon}></FeatherIcon>

                        {/* sunset */}
                        <View style={[{ flex: 3 }, Styles.center]}>
                            <FeatherIcon size={30} color={'#ffe5c9'} name="sunset"></FeatherIcon>
                            <Text>{this.SunTime(this.state.weather.sys.sunset)}</Text>
                        </View>
                    </View>

                    {/* Description du temps et temperature */}
                    <View style={[{ flex: 2 }, Styles.center]}>

                        <View style={[{ flex: 1 }, Styles.center]}>
                            <Text style={{ fontSize: 30, color: '#fff' }}>{this.state.weather.name}</Text>
                            <Text style={{ fontSize: 15, color: '#fff' }}>{this.state.weather.weather[0].description}</Text>
                        </View>


                        {/* rows pour la remperature */}
                        <View style={[{ flex: 2, flexDirection: 'row' }, Styles.center]}>

                            {/* temp min */}
                            <View style={[{ flex: 3, flexDirection: 'column' }, Styles.center]}>
                                <Text style={{ fontSize: 30, color: '#b8e3ff' }}>{parseInt(this.state.weather.main.temp_min)}°</Text>
                                <Text style={{ fontSize: 10, color: '#b8e3ff' }}>min</Text>
                            </View>

                            {/* temp actuelle */}
                            <Text style={{ fontSize: 60, color: '#fff' }}>{parseInt(this.state.weather.main.temp)}°</Text>

                            {/* temp max */}
                            <View style={[{ flex: 3, flexDirection: 'column' }, Styles.center]}>
                                <Text style={{ fontSize: 30, color: '#ffe6b8' }}>{parseInt(this.state.weather.main.temp_max)}°</Text>
                                <Text style={{ fontSize: 10, color: '#ffe6b8' }}>max</Text>
                            </View>
                        </View>
                    </View>

                    {/* Description du temps et temperature */}
                    <View style={{ flex: 1 }}>
                        <View style={[{ flex: 3 }, Styles.center]}>
                            <Text>Today wind speed is : {this.state.weather.wind.speed} km/h</Text>
                        </View>
                    </View>
                </LinearGradient>
            ) : (//si on a pas les données du temps on affiche un chargement
                    <Loading loadingColor="#4f5661">
                        <Text>Connexion au serveur ...</Text>
                    </Loading>
                )
        );
    }
}

export default HomePage;

