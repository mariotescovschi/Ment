import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FIREBASE_AUTH} from "../../../FireBaseConfig";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import CustomText from "../../../assets/CustomText";
import React from "react";
import {useContextMetadata} from "../../../MetadataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image} from "expo-image";
const auth = FIREBASE_AUTH;
const Settings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {setCurrentUser} = useContextMetadata();
    const signOutUser = async () => {
        try {
            setCurrentUser(null);
            AsyncStorage.removeItem('currentUser');
            await auth.signOut();
        }
        catch (error) {
            console.log(error);
        }
    }

    return(
        <SafeAreaView style={style.page}>

            {/* The header */}
            <View style={style.header}>

                <View style={{justifyContent:'center', flex: 1, alignItems:'flex-start'}}>
                    <Pressable
                        onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/left_arrow_icon.png')} style={{width: 20, height: 20, marginHorizontal: 5}}/>
                    </Pressable>
                </View>
            </View>
            <View style={style.content}>
                <CustomText style = {style.title}> SETARI </CustomText>
                <Text style={{color: 'white', textAlign: 'center'}}>caca</Text>
                <Pressable
                    onPress={signOutUser}
                    style={{backgroundColor: 'white', padding: 10, borderRadius: 5}}>
                    <Text style={{color: 'black'}}>Sign Out</Text>
                </Pressable>
            </View>


        </SafeAreaView>
    );
}

export default Settings;

const style = StyleSheet.create({
    page:{
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});