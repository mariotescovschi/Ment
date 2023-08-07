import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const tutorial = () => {

    return(
        <View style = {style.container} >
            <Text>Welcome to Ment!</Text>
        </View>
    );
}

export default tutorial;


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    }
})