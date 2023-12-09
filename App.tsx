import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import {AuthProvider} from "./SignIn/CreateAccount/AuthContext";
import LoginNavigator from "./Navigation/LoginNavigator";
import {CustomDropdownProvider} from "./SignIn/CreateAccount/AccountData/DropdownContext";
import {ContinueProvider} from "./SignIn/CreateAccount/ContinueContext";
import * as SplashScreen from 'expo-splash-screen';
import {MetadataProvider} from "./MetadataContext";
import {initializeApp} from "firebase/app";
export default function App(){

   SplashScreen.preventAutoHideAsync();
   setTimeout(SplashScreen.hideAsync, 5000);

        return (
           <MetadataProvider>
            <AuthProvider>
                <ContinueProvider>
                <CustomDropdownProvider>
            <NavigationContainer>
                <LoginNavigator/>
            </NavigationContainer>
                </CustomDropdownProvider>
                </ContinueProvider>
            </AuthProvider>
           </MetadataProvider>
        );
}

