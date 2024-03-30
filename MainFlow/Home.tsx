import {Pressable, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import CustomText from "../assets/CustomText";
import React from "react";
import {Image} from "expo-image";
import {useContextMetadata} from "../MetadataContext";

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {userPhoto} = useContextMetadata();
    return (
        <SafeAreaView style={style.page}>
            {/* The header */}
            <View style={style.header}>
                <View style={style.flexContainer}>
                    <Pressable onPress={() => {
                        console.log("PULA");
                    }}>
                        <Text style={{color: 'white'}}>Add Friends</Text>
                    </Pressable>
                    {/* Left Placeholder for balance, can be used for a back button or similar */}
                </View>

                <View style={style.titleContainer}>
                    <CustomText style={style.title}>MENT</CustomText>
                </View>

                <View style={style.profileMenuContainer}>
                    <Pressable onPress={() => navigation.navigate('Account')}>
                        {/* Profile image */}
                        <Image source={{uri: userPhoto}}
                               style={style.profileMenu}
                               cachePolicy='memory-disk'/>
                    </Pressable>
                </View>
            </View>

            <View style={style.content}>
                {/* Content */}
            </View>
        </SafeAreaView>
    );
};

export default Home;

const style = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center children horizontally
    },
    titleContainer: {
        //backgroundColor: 'red', // For testing purposes
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center children horizontally
    },
    profileMenuContainer: {
        //backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end', // Center children horizontally
    },
    title: {
        fontSize: 35,
        color: '#fff',
    },
    content: {
        flex: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileMenu: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: '15%',
    },
});