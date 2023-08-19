
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tutorial from './SignIn/Intro/Tutorial';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./SignIn/Login";
import AddFriends from "./SignIn/AddFriends";
import Name from "./SignIn/CreateAccount/Name";
import School from "./SignIn/CreateAccount/School";
import AccountCreation from "./SignIn/CreateAccount/AccountCreation";

import React, {useEffect, useState} from "react";
import * as Font from "expo-font";
import Home from "./Home";
interface Props {
    isLoggedIn: boolean;
}
const user: Props = {
    isLoggedIn: false,
}


const Stack = createNativeStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName = {user.isLoggedIn ? 'Home' : 'Tutorial'}
            >
                <Stack.Screen name = 'Tutorial' component= {Tutorial} options={{headerShown: false}}/>
                <Stack.Screen name = 'Login' component= {Login} options={{headerShown: false}}/>
                <Stack.Screen name = 'AddFriends' component= {AddFriends} options={{headerShown: false}}/>
                <Stack.Screen name = 'Home' component={Home} options={{headerShown: false}}/>
                <Stack.Screen name = 'Name' component={Name} options={{headerShown: false}}/>
                <Stack.Screen name = 'School' component={School} options={{headerShown: false}}/>
                <Stack.Screen name = 'AccountCreation' component={AccountCreation} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

