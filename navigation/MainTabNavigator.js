import HomePage from '../pages/HomePage';
import {View} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import SettingsPage from "../pages/SettingsPage";
import FavoritePage from "../pages/FavoritePage";
import AddFavoritePage from "../pages/AddFavoritePage";
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

const favoritesNavigator = createStackNavigator(
    {
        Favorites:{
            screen : FavoritePage,
        },
        AddFavorites:{
            screen : AddFavoritePage
        }
    },
    {
        initialRouteName:'Favorites',
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:'#f59f16',
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                fontWeight:'bold',
            }
        },
    }
);

const tabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions:{
                tabBarLabel: 'Accueil',
                tabBarIcon:({tintColor})=> (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>
                    </View>
                )
            }
        },
        Settings: {
            screen: SettingsPage,
            navigationOptions:{
                tabBarLabel: 'Parametres',
                tabBarIcon:({tintColor})=> (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-menu'}/>
                    </View>
                )
            }
        },//au lieu de mettre une page ici, on va mettre un favoritesNavigator 
        Favorites: {
            screen: favoritesNavigator,
            navigationOptions:{
                tabBarLabel: 'Favorites',
                tabBarIcon:({tintColor})=> (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-star'}/>
                    </View>
                )
            }
        },
    },
    {
        initialRouteName: 'Home',
        activeColor: '#cfcfcf',
        inactiveColor: '#969696',
        barStyle: { backgroundColor: '#5c5c5c' },
    }
);

export default tabNavigator;