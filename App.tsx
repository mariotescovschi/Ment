import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import {AuthProvider, useAuth} from "./SignIn/CreateAccount/AuthContext";
import LoginNavigator from "./Navigation/LoginNavigator";
import {CustomDropdownProvider} from "./SignIn/CreateAccount/AccountData/DropdownContext";
export default function App(){
    const AuthContext = React.createContext({});
        return (
            <AuthProvider>
                <CustomDropdownProvider>
            <NavigationContainer>
                <LoginNavigator/>
            </NavigationContainer>
                </CustomDropdownProvider>
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

