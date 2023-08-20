import Tutorial from "../SignIn/Intro/Tutorial";
import Login from "../SignIn/Login";
import React from "react";
import Home from "../Home";
import AddFriends from "../SignIn/AddFriends";
import Name from "../SignIn/CreateAccount/Name";
import School from "../SignIn/CreateAccount/School";
import AccountCreation from "../SignIn/CreateAccount/AccountCreation";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import {useAuth} from "../AuthContext";
import LoadingScreen from "../SignIn/LoadingScreen";

const NotLoggedInNavigator = () => {


    const value =
        {   authUser,
            setAuthUser,
            isLoggedIn,
            setIsLoggedIn} = useAuth();

    return (
        <Stack.Navigator initialRouteName={'LoadingScreen'}>
            {isLoggedIn ? (
                <>
                    <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
                </>
            ) : (
                <>
                    <Stack.Screen name='Tutorial' component={Tutorial} options={{headerShown: false}}/>
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name='AccountCreation' component={AccountCreation} options={{headerShown: false}}/>
                    <Stack.Screen name='Name' component={Name} options={{headerShown: false}}/>
                    <Stack.Screen name='School' component={School} options={{headerShown: false}}/>
                </>
            )}
        </Stack.Navigator>
    );
}
export default NotLoggedInNavigator;