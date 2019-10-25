import React from 'react';
import { Text, View, FlatList, TextInput,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../uiStyle/Styles';
import { Button } from 'react-native-paper';
import WeatherService from '../services/Weather-services';


class AddFavoritePage extends React.Component {

    

    //cette page s'affiche en mode popup 
    serv =  new WeatherService();

    static navigationOptions = () => {
        return{
            title: 'Ajouter une ville',
        }
    };

    state = {
        cityName : ''
    };

    componentDidMount(){
    }

    changeText(text){
        this.setState({cityName : text});
    }

    //on utilise le storage pour stocker une variable en local
    onPressAddCity(){
        

        this.serv.getWeatherHome(this.state.cityName).then((resp)=>{//test pour savoir si la ville existe
            console.log(`succès ${resp.data.cod}`)
            
            AsyncStorage.getItem('cities').then(data => {//récup anciens favoris stockés sur tel
            
                let tab=[];
                
                //si on a entré un nom de ville
                if(this.state.cityName.length != 0){
                    if( data !== null){//si on a déja des favoris
                        tab = JSON.parse(data);
                        tab.push(this.state.cityName);
                    }else{
                        tab = [this.state.cityName];
                    }
                    AsyncStorage.setItem('cities',JSON.stringify(tab)).then(()=>{
                        this.props.navigation.goBack();
                        this.props.navigation.state.params.onGoBack();
                    }).catch((err)=>{
                        alert(err)
                    })
                }else{
                    alert('veuillez entrer une ville');
                } 
            }).catch({})
            
        }).catch(
            console.log('error')
        );
       
    }


    //  ()=> permet d'accéder au this de ce component
    render() {

        return (
            <View>

                <TextInput onChangeText={(text)=>this.changeText(text)} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
                <Button title="Ajouter" onPress={()=>this.onPressAddCity()}><Text style={{color:"#000",backgroundColor:"#CCC"}}>Ajouter cette ville</Text></Button>

            </View>
        );
    }
}

export default AddFavoritePage;