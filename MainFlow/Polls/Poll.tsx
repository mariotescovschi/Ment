import React, {useState} from "react";
import {Pressable, View, Text, FlatList, SafeAreaView} from "react-native";
import {useContextPoll} from "./PollContext";
import PollItem from "./PollItem";
import TutorialItem from "../../SignIn/Intro/TutorialItem";

const Poll = () => {

    const {questions, setQuestions, answers, setAnswer, setQuestionIndex, questionIndex} = useContextPoll();


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}}>
            <FlatList
                data={[questions[questionIndex]]}
                renderItem={({item}) => <PollItem poll={item}/>}
                scrollEnabled={false}
                horizontal
                pagingEnabled
                />

            <View style={{backgroundColor:'green', flex: 1}}></View>
        </SafeAreaView>
    );

}

export default Poll;