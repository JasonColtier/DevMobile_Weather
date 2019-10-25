import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Styles from '../uiStyle/Styles';
import PropTypes from 'prop-types';

//component affiché en attendant que Weather reçoive les données
class Loading extends React.Component {
    
    static propTypes = {
        loadingColor : PropTypes.string.isRequired
    };
    
    render() {
        // props recoit les attributs

        return (
            <View style={{ flex: 1 }}>
                <View style={[{ flex: 1 }, Styles.center]}>
                    <ActivityIndicator size='large' color={this.props.loadingColor}/>
                    {this.props.children}{/* Va chercher l'enfant unique donné en paramètres */}
                </View>
            </View>
        );
    }
}

export default Loading;
