import Tutorial from "../SignIn/Intro/Tutorial";
import Login from "../SignIn/Login";
import React from "react";

const LoginNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Tutorial">
            <Stack.Screen name = 'Tutorial' component= {Tutorial} options={{headerShown: false}}/>
            <Stack.Screen name = 'Login' component= {Login} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default LoginNavigator;