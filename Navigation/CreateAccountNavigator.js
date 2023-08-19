import Login from "../SignIn/Login";
import AccountCreation from "../SignIn/CreateAccount/AccountCreation";
import React from "react";

const LoginNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Tutorial">
            <Stack.Screen name = 'AccountCreation' component= {AccountCreation} options={{headerShown: false}}/>
            <Stack.Screen name = 'Login' component= {Login} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}
