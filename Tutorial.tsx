import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Button,
    Pressable,
    TouchableOpacity, Animated, FlatList
} from 'react-native';
import * as Font from 'expo-font';
import {NavigationContainer, ParamListBase, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from "react";
import Login from "./Login";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import Image = Animated.Image;
import slides from "./slides";
import TutorialItem from "./TutorialItem";
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
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return(
        <View style={style.page}>
            <SafeAreaView style = {style.header} >
                <View style={style.extra}/>

                <CustomText style = {style.title}> MENT </CustomText>

                <View  style={style.button}>
                <Pressable
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={style.skipButton}> Sari peste </Text>
                </Pressable>
                </View>

            </SafeAreaView>


            <View style={style.content}>
                <FlatList
                    style = {style.item}
                    data={slides}
                    renderItem= {(item) => (
                    <Image source={item.item.image}/>
                )}
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false}
                />
            </View>

            <View style={style.nextButton1}>
                <Pressable
                    onPress={() => navigation.navigate('Login')}>
                    <CustomText style={style.nextButton}>Continuă</CustomText>
                </Pressable>
            </View>
        </View>
    );
}

export default Tutorial;


const style = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#000',
    },
    extra:{
        width: '33%',
        backgroundColor: '#000',
    },
    title: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
        alignSelf: 'center',
        width: '33%',
    },
    header: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipButton:{
        textAlign: 'right',
        color: 'grey',
    },
    button:{
        width: '33%',
    },
    nextButton:{
        textAlign: 'center',
        color: '#fff',
        fontSize: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        paddingHorizontal: 155,
        paddingVertical: 10,
        borderColor: '#fff',
    },
    nextButton1:{
      alignSelf: 'center',
    },
    content:{
        height: '70%',
        justifyContent: 'center',
    },
    item:{
        alignSelf: 'flex-end',
    }

})