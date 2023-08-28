import {Text, View} from 'react-native';
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import React from "react";
import Home from "../Home";
import {FIREBASE_AUTH} from "../FireBaseConfig";
import {NavigationContainer, ParamListBase, useNavigation} from "@react-navigation/native";
import {useAuth} from "./CreateAccount/AuthContext";


const LoadingScreen = () => {
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    } = useAuth();

    console.log(isLoggedIn);
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Cucul mare </Text>
        </View>
    );
}

export default LoadingScreen;