import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomText from "../../assets/CustomText";
import React, {useEffect} from "react";
import {useContextMetadata} from "../../MetadataContext";
import {timeUntilNextPoll} from "./PollFunctions";


const Poll = () => {
    const {polls} = useContextMetadata();
    const currentUser = useContextMetadata().currentUser;
    const [nextPoll, setNextPoll] = React.useState({ hours: 0, minutes: 0 });

    useEffect(() => {
        const updatePollTime = () => {
            const nextPollTime = timeUntilNextPoll();
            setNextPoll(nextPollTime);
            console.log(nextPollTime);
        };

        updatePollTime();
        const intervalId = setInterval(updatePollTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const count = polls.filter((poll) => poll).length;

    return (
        <SafeAreaView style={style.page}>
            <View style={style.header}>
                <CustomText style={style.title}> MENT </CustomText>
            </View>
            <View style={style.content}>
                <Text
                    style={{color: 'white', alignSelf: 'flex-start'}}>You have {count} polls available.</Text>
            </View>

            <View style={style.footer}>
                <Pressable style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', padding: '3%', marginHorizontal: '6%', borderRadius: 50}}>
                <Text style={{color: 'white', alignSelf: 'center'}}>{count === 0 ? "Next poll available: " + nextPoll.hours + " hours and " + nextPoll.minutes + " minutes": "Start"}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default Poll;

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
        flex: 12,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});