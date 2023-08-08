import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return(
        <View style={style.page}>
            <View style={style.container}>
        <Text style= {{color: '#fff'}}>caca</Text>
            <Button
                title={'back'}
                onPress={() => navigation.navigate('Tutorial')}
            />
                </View>
        </View>
    );
}

export default Login;

const style = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#000',
    },
    button:{
        color: '#fff',
        fontSize: 40,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#314432',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
    }
);
