import {
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    View, Keyboard, Platform
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {ParamListBase, useFocusEffect, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState, useEffect, useCallback} from "react";


const School = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
        return (
        <SafeAreaView style={style.page}>
            <Pressable
                onPress={() => navigation.navigate('AccountCreation')}
                style={style.button}>
                <Text style={style.buttonText}>Continua</Text>
            </Pressable>
        </SafeAreaView>

    );
}

export default School;

const style = StyleSheet.create({
        page:{
            flex: 1,
            backgroundColor: '#000',
            alignItems: 'stretch',
        },

        button:{
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 50,
            backgroundColor: '#fff',
            marginHorizontal: '2%',
            marginVertical: '2%'
        },

        buttonText:{
            textAlign: 'center',
            fontSize: 20,
            margin: '2.5%',
            color: 'black',
        },
        input: {
            textAlign: 'center',
            height: 50,
            margin: '2%',
            color: '#fff',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 50,
            fontSize: 20,

        },

        inputView: {
            flex: 20,
            justifyContent: 'flex-start',
        },

        loginButton: {
            flex: 2,
            justifyContent: 'flex-end',
        }
    }
);
