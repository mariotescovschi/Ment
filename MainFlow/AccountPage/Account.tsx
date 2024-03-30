import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React from "react";
import {useContextMetadata} from "../../MetadataContext";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FireBaseConfig";
import {Image} from "expo-image";
import {pickImage} from "./ImageFunctions";

/**
 * Account component that displays the user's account information
 * and allows the user to pick and upload a new profile picture.
 */
const Account = () => {
    const database = FIRESTORE_DB;
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {userName, userPhoto, setUserPhoto} = useContextMetadata();
    const currentUser = FIREBASE_AUTH.currentUser;

    return (
        <SafeAreaView style={style.page}>
            {/* The header */}
            <View style={style.header}>
                <View style={{justifyContent: 'center', flex: 1, alignItems: 'flex-start'}}>
                    <Pressable
                        onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/left_arrow_icon.png')}
                               style={{width: 20, height: 20, marginHorizontal: 5}}/>
                    </Pressable>
                </View>

                <View style={{alignItems: 'flex-end', flex: 1, justifyContent: 'center'}}>
                    <Pressable
                        onPress={() => navigation.navigate('Settings')}>
                        <Image source={require('../../assets/settings_icon.png')}
                               style={{width: 25, height: 25, marginHorizontal: 5}}/>
                    </Pressable>
                </View>


            </View>
            <View style={style.content}>
                <Pressable onPress={() => {
                    pickImage(database, currentUser, setUserPhoto);
                }}>
                    <Image source={{uri: userPhoto}}
                           style={style.profilePicture}
                           cachePolicy={"memory-disk"}/>
                </Pressable>
                <Text style={style.userName}>
                    {userName}
                </Text>
            </View>

        </SafeAreaView>
    );
}

export default Account;

const style = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    title: {
        includeFontPadding: false,
        color: '#fff',
        fontSize: 40,
    },

    content: {
        flex: 15,
        alignItems: 'center',
    },

    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
        //backgroundColor:'white'
    },

    userName: {
        color: 'white',
        fontSize: 20,
        marginVertical: 10,
    }
});