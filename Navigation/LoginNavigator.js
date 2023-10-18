import Tutorial from "../SignIn/Intro/Tutorial";
import Login from "../SignIn/Login";
import React from "react";
import Name from "../SignIn/CreateAccount/Name";
import AccountCreation from "../SignIn/CreateAccount/AccountCreation";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuth} from "../SignIn/CreateAccount/AuthContext";
import Country from "../SignIn/CreateAccount/AccountData/Country";
import HomeTab from "./HomeTab";

const Stack = createNativeStackNavigator();

const NotLoggedInNavigator = () => {
    const {isLoggedIn} = useAuth();

    return (
        <Stack.Navigator initialRouteName={'LoadingScreen'}>
            {
                isLoggedIn ? (
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