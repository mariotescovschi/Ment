import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomText from "../../assets/CustomText";
import React, {useEffect, useState} from "react";
import {useContextMetadata} from "../../MetadataContext";
import {timeUntilNextPoll} from "./PollFunctions";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useContextPoll} from "./PollContext";
import {startPoll} from "./PollFunctions";
import {Image} from "expo-image";

const renderLatestMents = (item) => {
    return (
        <View style={{padding: '2%', flex: 1}}>
            <View style={{flex: 1, padding: '1%'}}>
                <Text style={{color: 'white', fontSize: 18}}>{item.question}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, padding: '1%', marginLeft: '5%'}}>
                <Image
                    source={{uri: item.to.userPhoto}}
                    style={{width: 30, height: 30, borderRadius: 15, marginRight: '2%'}}
                />
                <Text style={{color: 'white', fontSize: 18}}>{item.to.userName}</Text>
            </View>
        </View>
    );
}

const PollMenu = () => {
    const {polls} = useContextMetadata();
    const {mentsSent} = useContextMetadata();
    const [nextPoll, setNextPoll] = React.useState({hours: 0, minutes: 0});
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {setQuestions} = useContextPoll();
    const {setPollIndex} = useContextPoll();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const updatePollTime = () => {
            const nextPollTime = timeUntilNextPoll();
            setNextPoll(nextPollTime);
        };

        updatePollTime();
        const intervalId = setInterval(updatePollTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const count = polls.filter((poll) => poll).length;

    return (
        <SafeAreaView style={style.page}>
            <View
                style={style.header}>
                <CustomText style={style.title}> MENT </CustomText>
            </View>


            <View style={style.content}>
                <View style={{flex: 6}}>
                    <Text onPress={() => {
                        mentsSent.map((ment) => {
                            console.log(ment.to.userName);
                        });
                    }}
                          style={{color: 'white', marginLeft: '2%'}}>YOUR LATEST MENTS: </Text>
                    <FlatList
                        ItemSeparatorComponent={() => <View
                            style={{height: 1, backgroundColor: 'grey', width: '80%', alignSelf: 'center'}}/>}
                        initialNumToRender={4}
                        style={{borderRadius: 15, borderWidth: 0, borderColor: 'grey', flex: 1, marginHorizontal: '3%'}}
                        data={mentsSent}
                        scrollEnabled={false}
                        renderItem={({item}) => renderLatestMents(item)}
                        ListFooterComponent={() => <View style={{}}>
                            <Pressable
                                onPress={() => {
                                    //navigation.navigate('PollHistory');
                                }}
                                style={{
                                    backgroundColor: 'grey',
                                    padding: '2%',
                                    marginHorizontal: '6%',
                                    borderRadius: 50,
                                    width: '35%',
                                    alignSelf: 'center'
                                }}>
                                <Text style={{color: 'white', alignSelf: 'center'}}>View Poll History</Text>
                            </Pressable>
                        </View>
                        }

                    />
                </View>
            </View>
            <View style={style.footer}>
                <Pressable
                    disabled={loading === true}
                    onPress={() => {
                        setLoading(true);
                        setPollIndex(polls.findIndex((poll) => poll));
                        startPoll(setQuestions).then(() => {
                            setLoading(false);
                            navigation.replace("Poll1");
                        });

                    }}
                    style={{
                        flex: 1,
                        backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '3%',
                        marginHorizontal: '6%',
                        borderRadius: 50
                    }}>

                    <Text
                        style={{
                            color: 'white',
                            alignSelf: 'center'
                        }}>{count === 0 ? "Next poll available: " + (nextPoll.hours === 0 ? "" : nextPoll.hours + " hours and ") + nextPoll.minutes + " minutes" : "Start poll. " + count + " remaining"}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default PollMenu;

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
    title: {
        fontSize: 35,
        color: '#fff',
    },
    content: {
        flex: 16,
    },
    footer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});