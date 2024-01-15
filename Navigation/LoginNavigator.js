import Tutorial from "../SignIn/Intro/Tutorial";
import Login from "../SignIn/Login";
import React from "react";
import Name from "../SignIn/CreateAccount/Name";
import AccountCreation from "../SignIn/CreateAccount/AccountCreation";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Country from "../SignIn/CreateAccount/AccountData/Country";
import HomeTab from "./HomeTab";
import * as SplashScreen from "expo-splash-screen";
import {useContextMetadata} from "../MetadataContext";

const Stack = createNativeStackNavigator();

const NotLoggedInNavigator = () => {
    const {loading, currentUser} = useContextMetadata();

    if(!loading)
        SplashScreen.hideAsync();

    return (
        <Stack.Navigator>
            {
                currentUser !== null ? (
                        <>
                            <Stack.Screen name='HomeTab' component={HomeTab} options={{headerShown: false}}/>

                        </>
                    ) : (
                        <>
                            <Stack.Screen name='Tutorial' component={Tutorial} options={{headerShown: false}}/>
                            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                            <Stack.Screen name='AccountCreation' component={AccountCreation} options={{headerShown: false}}/>
                            <Stack.Screen name='Name' component={Name} options={{headerShown: false}}/>
                            <Stack.Screen name='Country' component={Country} options={{headerShown: false}}/>
                        </>
                    )
                }
        </Stack.Navigator>
    );
}
export default NotLoggedInNavigator;