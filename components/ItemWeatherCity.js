import React from 'react';
import { Text, View ,AsyncStorage} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Styles from '../uiStyle/Styles';
import PropTypes from 'prop-types';
import WeatherService from '../services/Weather-services';
import { Button } from 'react-native-paper';
import WeatherIcon from '../uiStyle/WeatherIcon';
import FeatherIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

//component affiché en attendant que Weather reçoive les données
class FavoriteCityList extends React.Component {

    static navigationOptions = (data) => {
        const {navigation} = data;
    }
    serv = new WeatherService();

    state = {
        weather: null
    }

    
    static propTypes = {
        cityName: PropTypes.string.isRequired,
        navigation: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.serv.getWeatherHome(this.props.cityName).then((resp) => {
            this.setState({ weather: resp.data });
        }).catch(
        )

    }

    setCurrentFavorite(nomVille) {

        AsyncStorage.setItem('currentFavorite', JSON.stringify([nomVille])).then(() => {
            console.log(this.props.navigation);
            this.props.navigation.navigate('Accueil');//retour vers l'accueil
        }).catch((err) => {
            alert(err)
        });
    }


    render() {
        // props recoit les attributs

        return (        

            <View style={{ flex: 1, flexDirection: 'row', minHeight: 50 }}>
                <View style={[{ flex: 2, flexDirection: 'column' }, Styles.center]}>
                    <Button title="setFavorite" onPress={() => this.setCurrentFavorite(this.props.cityName)}><Text style={{color : "#fff",fontSize:20}}>{this.props.cityName}</Text></Button>
                </View>
                <View style={[{ flex: 2, flexDirection: 'column' }, Styles.center]}>

                    {(this.state.weather != null) ? (
                        <View style={[{ flex: 2, flexDirection: 'row' ,justifyContent: 'space-evenly'},Styles.center]}>
                            <FeatherIcon size={20} color="#000" name={new WeatherIcon().getWeatherIcon(this.state.weather.weather[0].main).icon}></FeatherIcon>
                            <Text> {parseInt(this.state.weather.main.temp)}°C </Text>
                        </View>

                    ) : (
                            <ActivityIndicator size='small' color={this.props.loadingColor} />
                        )}
                </View>
            </View>
        );
    }
}

export default FavoriteCityList;