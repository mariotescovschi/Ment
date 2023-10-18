import {Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import CustomText from "../../assets/CustomText";
import React from "react";


const Account = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return(
        <SafeAreaView style={style.page}>
            {/* The header */}
            <View style={style.header}>
                <View style={{justifyContent:'center', flex: 1, alignItems:'flex-start'}}>
                    <Pressable
                        onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/left_arrow_icon.png')} style={{width: 20, height: 20, marginHorizontal: 5}}/>
                    </Pressable>
                </View>

                <View style={{alignItems:'flex-end', flex: 1, justifyContent:'center'}}>
                    <Pressable
                        onPress={() => navigation.navigate('Settings')}>
                        <Image source={require('../../assets/settings_icon.png')} style={{width: 25, height: 25, marginHorizontal: 5}}/>
                    </Pressable>
                </View>


            </View>
            <View style={style.content}>
                <CustomText style = {style.title}> CONT </CustomText>
                <Text style={{color: 'white', textAlign: 'center'}}>caca</Text>
            </View>

        </SafeAreaView>
    );
}

export default Account;

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