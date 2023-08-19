import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
const Stack = createNativeStackNavigator();
import {AuthProvider, useAuth} from "./AuthContext";
import LoginNavigator from "./Navigation/LoginNavigator";
import AddFriends from "./SignIn/AddFriends";
export default function App(){
    const AuthContext = React.createContext({});
        return (
            <AuthProvider>
            <NavigationContainer>
                <LoginNavigator/>
            </NavigationContainer>
            </AuthProvider>
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

