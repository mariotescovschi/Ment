import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
    return(
        <View style={style.page}>
        <Text style={{color: 'white'}}>caca</Text>
        </View>
    );
}

export default Home;

const style = StyleSheet.create({
   page:{
         flex: 1,
         backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
   }
});