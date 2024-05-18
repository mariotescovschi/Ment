import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomText from "../../assets/CustomText";
import React, {useEffect} from "react";
import {useContextMetadata} from "../../MetadataContext";
import {timeUntilNextPoll} from "./PollFunctions";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {FIREBASE_AUTH} from "../../FireBaseConfig";
import {questionType, useContextPoll} from "./PollContext";
const startPoll = async (setQuestions: React.Dispatch<React.SetStateAction<questionType[]>>) => {
    const user = FIREBASE_AUTH.currentUser;
    const token = await user.getIdToken();

    await fetch("https://europe-central2-ment-12376.cloudfunctions.net/getPoll", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            }
    })
        .then(response => response.json()).then(data => {
            const formattedData:questionType[] = data.map(item => ({
                question: item.question,
                options: item.users.map(option => ({
                    userName: option.userName,
                    userPhoto: option.userPhoto,
                    userUID: option.userUID
                }))
            }));
            setQuestions(formattedData);
        });
}


const PollMenu = () => {
    const {polls} = useContextMetadata();
    const [nextPoll, setNextPoll] = React.useState({ hours: 0, minutes: 0 });
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {setQuestions, setAnswers} = useContextPoll();


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
            <View style={style.header}>
                <CustomText style={style.title}> MENT </CustomText>
            </View>
            <View style={style.content}>
                <Text
                    style={{color: 'white', alignSelf: 'flex-start'}}>You have {count} polls available.</Text>
            </View>

            <View style={style.footer}>
                <Pressable
                    style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', padding: '3%', marginHorizontal: '6%', borderRadius: 50}}>
                <Text onPress={() => {
                    startPoll(setQuestions).then(() => {
                        navigation.replace("Poll1");
                    });

                }}
                    style={{color: 'white', alignSelf: 'center'}}>{count === 0 ? "Next poll available: " + (nextPoll.hours === 0 ? "" : nextPoll.hours + " hours and ") + nextPoll.minutes + " minutes": "Start"}</Text>
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