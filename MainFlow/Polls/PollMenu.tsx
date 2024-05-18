import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomText from "../../assets/CustomText";
import React, {useEffect} from "react";
import {useContextMetadata} from "../../MetadataContext";
import {timeUntilNextPoll} from "./PollFunctions";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useContextPoll} from "./PollContext";
import {startPoll} from "./PollFunctions";
import {Image} from "expo-image";

const PollMenu = () => {
    const {polls} = useContextMetadata();
    const {mentsSent} = useContextMetadata();
    console.log(mentsSent);
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
                    <Text onPress={() =>    {
                        mentsSent.map((ment) => {
                            console.log(ment.to.userName);
                        });
                    }}
                        style={{color: 'white'}}>Your ments: </Text>
                    <FlatList
                        data={mentsSent}
                        renderItem ={({item}) => {
                            return (
                                <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                                    {/* Display user photo */}
                                    <Image
                                        source={{uri: item.to.userPhoto}}
                                        style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}}
                                    />
                                    {/* Display user name */}
                                    <View>
                                        <Text style={{color: 'white'}}>{item.to.userName}</Text>
                                        {/* Display question */}
                                        <Text style={{color: 'white'}}>{item.question}</Text>
                                    </View>
                                </View>
                            );
                        }}/>
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
        //flexDirection: 'row',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    footer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});