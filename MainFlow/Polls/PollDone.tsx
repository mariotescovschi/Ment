import {Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const PollDone = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <SafeAreaView style={style.page}>
            <Text style={{fontSize: 30, color: 'white', marginTop: '10%'}}> Well Done! </Text>

                <Pressable onPress={() => {
                    navigation.replace('HomeTabs');
                }} style={style.button}>
                    <Text style={style.buttonText}>Continue</Text>
                </Pressable>
        </SafeAreaView>
    );
}

export default PollDone;

const style = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    answer: {
        flex: 1,
        margin: '1%',
        marginHorizontal: '2%',
        paddingVertical: '2%',
    },
    answerText: {
        color: 'white',
    },
    footerButtons: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'white',
        padding: '4%',
        borderRadius: 10,
        //marginHorizontal: '10%'
        width: '90%',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
    },
});