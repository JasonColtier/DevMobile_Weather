import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign : 'center',
    },

    backRowLeft: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 80,
        backgroundColor: '#F00'
    },

    frontRow: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },

    cloudy: {
        backgroundColor: '#c9c9c9',
    },

    rain: {
        backgroundColor: '#c9c9c9',
    }
});

export default Styles;

