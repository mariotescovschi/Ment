import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomText from "../assets/CustomText";
import React from "react";


const PhotoFeed = () => {

    return(
        <SafeAreaView style={style.page}>
            <View style={style.header}>
                <CustomText style = {style.title}> MENT </CustomText>
            </View>
            <View style={style.content}>
                <Text style={{color: 'white'}}>caca</Text>
            </View>
        </SafeAreaView>
    );
}

export default PhotoFeed;

const style = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        includeFontPadding: false,
        color: '#fff',
        fontSize: 40,
    },

    content:{
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});