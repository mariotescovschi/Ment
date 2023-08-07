import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import tutorial from './Login/tutorial';
import Home from './home';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
interface Props {
    isLoggedIn: boolean;
}
const user: Props = {
    isLoggedIn: false,
}

const Stack = createNativeStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName= 'Login'>
                {user.isLoggedIn ? (
                    <Stack.Screen name = 'Home' component= {Home} options={{headerShown: false}}/>
                ) : (
                    <Stack.Screen name = 'Welcome' component= {tutorial} options={{headerShown: false}}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
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

