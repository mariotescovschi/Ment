import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import {AuthProvider, useAuth} from "./SignIn/CreateAccount/AuthContext";
import LoginNavigator from "./Navigation/LoginNavigator";
import {CustomDropdownProvider} from "./SignIn/CreateAccount/AccountData/DropdownContext";
import {ContinueProvider} from "./SignIn/CreateAccount/ContinueContext";
export default function App(){
    const AuthContext = React.createContext({});
        return (
            <AuthProvider>
                <ContinueProvider>
                <CustomDropdownProvider>
            <NavigationContainer>
                <LoginNavigator/>
            </NavigationContainer>
                </CustomDropdownProvider>
                </ContinueProvider>
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

