import {Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import * as Font from 'expo-font';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from "react";
import Login from "./Login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const CustomText = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'AsapCondensed': require('./assets/fonts/AsapCondensed-SemiBold.ttf'),
            });

            setFontLoaded(true);
        }

        loadFont();
    }, []);

    if (!fontLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <Text style={{ ...props.style, fontFamily: 'AsapCondensed' }}>
            {props.children}
        </Text>
    );
};

const Tutorial = () => {
    const navigation = useNavigation();
    return(
        <View style={style.page}>
            <SafeAreaView style = {style.AndroidSafeArea} >
                <CustomText style = {style.title}> Caca </CustomText>
                <Button
                    title={'LoginINPIZDAMASII'}
                    onPress={() => navigation.navigate('Login')}
                />
            </SafeAreaView>
        </View>
    );
}

export default Tutorial;


const style = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
    },
    title: {
        color: '#fff',
        fontSize: 40,
    },
    AndroidSafeArea: {
        alignItems: 'center',
        justifyContent: 'center',
       //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 40 : 0,

    }
})