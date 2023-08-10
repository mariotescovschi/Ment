
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tutorial from './Tutorial';
import Home from './home';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./Login";
import TutorialItem from "./TutorialItem";
import AddFriends from "./AddFriends";
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
            <Stack.Navigator>
                <Stack.Screen name = 'Tutorial' component= {Tutorial} options={{headerShown: false}}/>
                <Stack.Screen name = 'Login' component= {Login} options={{headerShown: false}}/>
                <Stack.Screen name = 'AddFriends' component= {AddFriends} options={{headerShown: false}}/>
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

