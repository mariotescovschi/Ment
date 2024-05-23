import {Pressable, SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import CustomText from "../assets/CustomText";
import React from "react";
import {Image} from "expo-image";
import {useContextMetadata} from "../MetadataContext";
import {FIRESTORE_DB} from "../FireBaseConfig";
import {doc, updateDoc} from "firebase/firestore";

const renderLatestMents = (item) => {
    return (
        <View style={{padding: '2%', flex: 1}}>
            <View style={{flex: 1, padding: '1%'}}>
                <Text style={{color: 'green', fontSize: 18}}>You were mented as:</Text>
                <Text style={{color: 'white', fontSize: 18}}>{item.question}</Text>
            </View>
        </View>
    );
}

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {polls, userData} = useContextMetadata();
    const {mentsReceived} = useContextMetadata();

    function getRandomTime(min: number, max: number): string {
        const hour = Math.floor(Math.random() * (max - min + 1)) + min;
        const minute = Math.floor(Math.random() * 60);
        const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
        const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
        return `${hourStr}:${minuteStr}`;
    }


    return (
        <SafeAreaView style={style.page}>
            {/* The header */}
            <View style={style.header}>
                <View style={style.flexContainer}>
                    <Pressable onPress={() => {
                        
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
                        <Image source={{uri: userData.userPhoto}}
                               style={style.profileMenu}
                               cachePolicy='memory-disk'/>
                    </Pressable>
                </View>
            </View>

            <View style={style.content}>
                <View style={{flex: 1}}>
                    <FlatList
                        ItemSeparatorComponent={() => <View
                            style={{height: 1, backgroundColor: 'grey', width: '80%', alignSelf: 'center'}}/>}
                        initialNumToRender={4}
                        style={{borderRadius: 15, borderWidth: 0, borderColor: 'grey', flex: 1, marginHorizontal: '3%'}}
                        data={mentsReceived}
                        scrollEnabled={false}
                        renderItem={({item}) => renderLatestMents(item)}
                        ListFooterComponent={() => <View style={{}}>
                            <Pressable
                                onPress={() => {
                                    console.log("View all ments")
                                }}
                                style={{
                                    backgroundColor: 'grey',
                                    padding: '2%',
                                    marginHorizontal: '6%',
                                    borderRadius: 50,
                                    width: '35%',
                                    alignSelf: 'center'
                                }}>
                                <Text style={{color: 'white', alignSelf: 'center'}}>View All Ments</Text>
                            </Pressable>
                        </View>
                        }

                    />
                </View>
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
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    profileMenu: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: '15%',
    },
});