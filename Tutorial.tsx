import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Button,
    Pressable,
    TouchableOpacity, Animated, FlatList, ScrollView,
} from 'react-native';
import * as Font from 'expo-font';
import {NavigationContainer, ParamListBase, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from "react";
import Login from "./Login";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import Image = Animated.Image;
import slides from "./slides";
import TutorialItem from "./TutorialItem";
import Paginator from "./Paginator";
import decay = Animated.decay;
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

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slidesRef = useRef(null);

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
        else {
            navigation.navigate('Login');
        }
    };

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
                    data={slides}
                    renderItem= {({item}) => <TutorialItem item={item}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{nativeEvent: {
                            contentOffset: {x: scrollX}
                        }}],
                        {useNativeDriver: false},

                    )}
                    scrollEventThrottle={1}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />

                <View style={{marginBottom: '5%'}}>
                    <Paginator data={slides} scrollX={scrollX}/>
                </View>
            </View>


            <View style={style.nextButton1}>
                <Pressable
                    onPress={() => scrollTo()}>
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
        borderRadius: Platform.OS === 'android' ? 50 : 25,
        borderWidth: 1,
        paddingHorizontal: '35%',
        paddingVertical: '2%',
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
    }

})