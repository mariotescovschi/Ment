import {Image, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import CustomText from "../assets/CustomText";
import React from "react";


const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return(
        <SafeAreaView style={style.page}>
            {/* The header */}
            <View style={style.header}>
                <View style={{width: '33%'}}></View>


                <CustomText style = {style.title}> MENT </CustomText>

                <View style={{width: '33%', alignItems: 'flex-end', justifyContent:'center',}}>
                    <Pressable
                        onPress={() => navigation.navigate('Account')}>
                        {/*Aici trebuie sa fie poza de profil*/}
                        <Image source={require('../assets/profile_icon.png')} style={{width: 30, height: 30}}/>
                    </Pressable>
                </View>

                </View>
            <View style={style.content}>

                <View>

                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;

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