import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import LoginNavigator from "./Navigation/LoginNavigator";
import {CustomDropdownProvider} from "./SignIn/CreateAccount/AccountData/DropdownContext";
import {ContinueProvider} from "./SignIn/CreateAccount/ContinueContext";
import {MetadataProvider} from "./MetadataContext";
export default function App(){

        return (
           <MetadataProvider>
                <ContinueProvider>
                <CustomDropdownProvider>
            <NavigationContainer>
                <LoginNavigator/>
            </NavigationContainer>
                </CustomDropdownProvider>
                </ContinueProvider>
           </MetadataProvider>
        );
}

