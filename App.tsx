import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from "react";
import LoginNavigator from "./Navigation/LoginNavigator";
import {CustomDropdownProvider} from "./SignIn/CreateAccount/AccountData/DropdownContext";
import {ContinueProvider} from "./SignIn/CreateAccount/ContinueContext";
import {MetadataProvider} from "./MetadataContext";
import {PollProvider} from "./MainFlow/Polls/PollContext";

export default function App(){
        return (
           <MetadataProvider>
               <PollProvider>
                <ContinueProvider>
                <CustomDropdownProvider>
            <NavigationContainer>
                <LoginNavigator/>
            </NavigationContainer>
                </CustomDropdownProvider>
                </ContinueProvider>
               </PollProvider>
           </MetadataProvider>
        );
}

