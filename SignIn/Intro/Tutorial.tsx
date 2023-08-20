import {Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Pressable, Animated, FlatList,} from 'react-native';
import * as Font from 'expo-font';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import slides from "./slides";
import TutorialItem from "./TutorialItem";
import Paginator from "./Paginator";
import theUser from "../../UserData";

//Text with AsapCondensed font
const CustomText = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'AsapCondensed': require('../../assets/fonts/AsapCondensed-Black.ttf'),
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

    const buttonName = ['Continuă', 'Continuă', 'Loghează-te'];

    //For the skip button
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    //To know which slide is currently displayed
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    //To know when the user has scrolled to the next slide
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slidesRef = useRef(null);

    //To scroll to the next slide
    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
        else {
            navigation.replace('Login');
        }
    };

    //To show the skip button
    const showSkip = () => {
            return(
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={style.skipButton}> Sari peste </Text>
                    </Pressable>
            )

    }
    return(
        <SafeAreaView style={style.page}>
            <StatusBar barStyle="light-content" backgroundColor='black'/>
            {/*The header*/}
            <View style = {style.header} >
                <View style={style.extra}/>

                <CustomText style = {style.title}> MENT </CustomText>

                {/*The skip button*/}
                <View style={style.button} >
                    {currentIndex < slides.length - 1 ? showSkip() : null}
                    </View>


            </View>

            <View style={style.content}>

                {/*The slides*/}
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

                {/*The paginator*/}
                <View style={{marginBottom: '5%'}}>
                    <Paginator data={slides} scrollX={scrollX}/>
                </View>

            </View>


            <View style={style.nextButtonView}>
                {/*The next button*/}
                <Pressable
                    onPress={() => scrollTo()}
                    style={
                    [style.nextButton,
                        {backgroundColor: currentIndex < slides.length - 1 ? 'black' : 'white' ,}]}
                >
                    <Text
                        style={
                        [style.nextButtonText, {color: currentIndex < slides.length - 1 ? 'grey' : 'black'}]}
                    >
                        {buttonName[currentIndex]}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
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
    },
    title: {
        includeFontPadding: false,
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
        alignSelf: 'center',
        width: '33%',
    },
    header: {
        flex: 1,
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
    nextButtonText:{
        textAlign: 'center',
        fontSize: 20,
    },
    nextButton:{
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        marginHorizontal: '2%',
        paddingVertical: '2.5%',
        borderColor: 'grey',
    },
    nextButtonView:{
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    content:{
        flex: 10,
        justifyContent: 'center',
    },
    item:{
    }

})