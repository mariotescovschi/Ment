import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import {AuthProvider} from "./SignIn/CreateAccount/AuthContext";
import LoginNavigator from "./Navigation/LoginNavigator";
import {CustomDropdownProvider} from "./SignIn/CreateAccount/AccountData/DropdownContext";
import {ContinueProvider} from "./SignIn/CreateAccount/ContinueContext";

export default function App(){
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

