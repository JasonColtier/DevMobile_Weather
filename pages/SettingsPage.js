import React from 'react';
import { View, Text , AsyncStorage} from 'react-native';
import { Button } from 'react-native-paper';

class SettingsPage extends React.Component {

    deleteFavoritesPress() {
        AsyncStorage.removeItem('cities').then(()=> alert('Favoris Supprimés'));
        AsyncStorage.removeItem('currentFavorite').then();
    }
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Button title="delete" onPress={()=>this.deleteFavoritesPress()}>Delete all favorites</Button>
            </View>
        );
    }
}

export default SettingsPage;