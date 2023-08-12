import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {FIREBASE_AUTH} from './FireBaseConfig';
import {isLoading} from "expo-font";

const Login = () => {
    const [phone, setPhone] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const auth=FIREBASE_AUTH;

    return(
        <View style={styles.container}>
            <TextInput style={styles.input} keyboardType={'phone-pad'} placeholder="Phone Number" autoCapitalize="none" onChangeText={(text) => setPhone(text)}></TextInput>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#000',
    },
    button:{
        textAlign: 'center',
        color: '#fff',
        fontSize: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        paddingHorizontal: 155,
        paddingVertical: 10,
        borderColor: '#fff',
    },
    container: {
        marginHorizontal:20,
        flex:1,
        justifyContent: 'center'
    },
    input: {
        marginVertical:4,
        height:50,
        borderWidth: 1,
        borderRadius:4,
        padding: 10,
        backgroundColor: '#fff'
    }
    }
);
