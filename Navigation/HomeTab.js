import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PhotoFeed from "../MainFlow/PhotoMents/PhotoFeed";
import Home from "../MainFlow/Home";
import React from "react";
import {Image} from "react-native";
import PollMenu from "../MainFlow/Polls/PollMenu";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Account from "../MainFlow/AccountPage/Account";
import Settings from "../MainFlow/AccountPage/Settings/Settings";
import Poll from "../MainFlow/Polls/Poll";
import PollDone from "../MainFlow/Polls/PollDone";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopColor: 'black',
                }
            }}
        >
            <Tab.Screen
                name="PhotoFeed" component={PhotoFeed}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image source={
                                focused ? require('../assets/hometabIcons/active_photos_icon.png')
                                    : require('../assets/hometabIcons/inactive_photos_icon.png')}
                                   style={{width: focused ? 30 : 25, height: focused ? 30 : 25}}
                            />
                        );
                    },

                }}/>
            <Tab.Screen
                name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image source={
                                focused ? require('../assets/hometabIcons/active_home_icon.png')
                                    : require('../assets/hometabIcons/inactive_home_icon.png')}
                                   style={{width: focused ? 30 : 25, height: focused ? 30 : 25}}
                            />
                        );
                    },
                }}/>
            <Tab.Screen
                name="Poll" component={PollMenu}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image source={
                                focused ? require('../assets/hometabIcons/active_poll_icon.png')
                                    : require('../assets/hometabIcons/inactive_poll_icon.png')}
                                   style={{width: focused ? 30 : 25, height: focused ? 30 : 25}}
                            />
                        );
                    },
                }}/>

        </Tab.Navigator>
    );
}

function HomeTab() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeTabs' component={HomeTabs} options={{headerShown: false}}/>
            <Stack.Screen name='Account' component={Account} options={{headerShown: false}}/>
            <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}}/>
            <Stack.Screen name='Poll1' component={Poll} options={{headerShown: false}}/>
            <Stack.Screen name='PollDone' component={PollDone} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default HomeTab;
