import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation();
    return(
        <View style={{justifyContent: 'center', flex: 1, color:'#000', alignItems: 'center'}}>
        <Text>caca</Text>
            <Button
                title={'back'}
                onPress={() => navigation.navigate('Tutorial')}
            />
        </View>
    );
}

export default Login;
