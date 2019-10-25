import React from 'react';
import { Text, View, FlatList, TextInput, AsyncStorage, RefreshControl, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../uiStyle/Styles';
import { Button } from 'react-native-paper';
import AddFavoritePage from './AddFavoritePage';
import { NavigationEvents } from 'react-navigation';
import { ActivityIndicator } from 'react-native-paper';
import ItemWeatherCity from '../components/ItemWeatherCity';
import { SwipeRow } from 'react-native-swipe-list-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Store from "../redux/Store";


class FavoritePage extends React.Component {

    //on utilise setState pour mettre à jour, ce qui enclanche le didMount

    //on rajoute des options de navigation
    //pour que le bouton + marche, il faut ajouter un nouveau composant
    static navigationOptions = (data) => {
        const {navigation} = data;
        return {
            title: 'Favoris',

            headerRight: (
                <Icon size={25} name={'ios-add'} style={{ marginRight: 30 }} onPress={() => {
                    if(navigation.state.params != null){
                        if(navigation.state.params.count < 6){
                            navigation.navigate('AddFavorites',navigation.state.params)
                        }else{
                            alert("Déja trop de villes ! Veuillez en supprimer une")
                        }
                    }
                    else{
                        navigation.navigate('AddFavorites',navigation.state.params)
                    }
                    }
                    
                }
                />  
            )
            
        }
    };

    onGoBack = () => {
        this.refresh();
    };

    //les données d'un component sont stockées dans le state
    state = {
        cities: [],
        refreshing : false,//agit comme un boolean qui active ou pas le raffraichissement 
    };

    //récupération des variables avec un délai
    componentDidMount() {
        Store.subscribe(() => console.log('store state : ',Store.getState().storageReducer));
        
        console.log(Store.dispatch({type : 'GET_CITIES'}));
 
        this.props.navigation.setParams({onGoBack : this.onGoBack});
        this.refresh();
        
    }

    refresh() {//appelé tout le temps par le onDidFocus
        this.setState({refreshing : true});
        console.log(Store.getState().storageReducer);
        AsyncStorage.getItem('cities').then((data) => {
            if(data != null){
                this.setState({ cities: JSON.parse(data).sort() , refreshing : false});
                this.props.navigation.setParams({count : JSON.parse(data).length});
                
            }else{
                this.props.navigation.setParams({count : 0});
            }
        }).catch((err) => {
            alert(err)
        });
        
    }


    deleteFavorite(cityName){
        AsyncStorage.getItem('cities').then(data => {//récup anciens favoris stockés sur tel
            
            let tab=[];
            tab = JSON.parse(data);
            
            for( var i = 0; i < tab.length; i++){ 
                if ( tab[i] == cityName) {
                  tab.splice(i, 1); 
                }
            }      
            AsyncStorage.setItem('cities',JSON.stringify(tab)).then(()=>{
                this.refresh();
            }).catch((err)=>{
                alert(err)
            })
        }).catch({})
        
    }


    //lorsqu'on affiche des données du state il faut faire attntion
    //render() se fait avant componentDidMount donc il faut mettre une condition impérativement


    //lorsqu'on est dans le menu et qu'on change de page, on fait une navigation
    // la navigation permet d'utiliser le bonton back du téléphone
    // il y a navigation standard
    // et navigation qui s'empile (avec les popups)

    // Des qu'on render sur une iteration on lui donne une key unique

    render() {
        return (
            // <NavigationEvents onGoBack={this.refresh()}></NavigationEvents> ,


            (this.state.cities.length != 0) ? ( 
                <View>
                    <FlatList
                        refreshControl = {<RefreshControl refreshing = {this.state.refreshing} onRefresh={() => this.refresh()} />}
                        data={this.state.cities}
                        renderItem={(element) => (//parcourt le tableau en retournant des éléments
                            <SwipeRow leftOpenValue={75} rightOpenValue={0} disableLeftSwipe={true} key={element.item}>
                                <View style={[Styles.backRowLeft]}>
                                    <Button title="supprimer" onPress={() => this.deleteFavorite(element.item)}>
                                    <FeatherIcon size={40} color="#FFF" name="trash-2"></FeatherIcon>
                                    </Button>
                                </View>
                                <View style={[Styles.frontRow],(element.index % 2 == 0)?({backgroundColor : '#CCC'}):({backgroundColor:"#AAA"})}>
                                    <ItemWeatherCity cityName={element.item} navigation={this.props.navigation}></ItemWeatherCity>
                                </View>
                            </SwipeRow>
                        )}
                    />

                    <Text style={Styles.center}>Sélectionnez votre ville préférée en cliquant dessus pour la voir s'afficher sur l'écran d'accueil !</Text>
                </View>
            ) : (
                    <View >
                        <Text style={Styles.center}> Chargement de vos favoris... vous pouvez en ajouter avec le bouton +</Text>
                    </View>
                )
        );
    }
}

export default FavoritePage;
