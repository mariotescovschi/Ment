import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';
import * as Font from 'expo-font';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const CustomText = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'AsapCondensed': require('../assets/fonts/AsapCondensed-SemiBold.ttf'),
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


const AddFriends = () =>
{
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
    <View style={style.page}>
            <SafeAreaView style = {style.header} >
                <View style={style.extra}/>
                <CustomText style = {style.title}> MENT. </CustomText>
            </SafeAreaView>
        </View>

    )
}


export default AddFriends;


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
