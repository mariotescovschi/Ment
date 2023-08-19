import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
const Stack = createNativeStackNavigator();
import {AuthProvider, useAuth} from "./AuthContext";
import LoginNavigator from "./Navigation/LoginNavigator";
import AddFriends from "./SignIn/AddFriends";
const AuthContext = React.createContext(null);
export default function App(){
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

