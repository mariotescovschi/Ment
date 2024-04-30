import React, {useState} from "react";
import {Pressable, View, Text, FlatList, SafeAreaView} from "react-native";
import {useContextPoll} from "./PollContext";
import PollItem from "./PollItem";

const Poll = () => {

    const {questions, setQuestions, answers, setAnswers, setQuestionIndex, questionIndex} = useContextPoll();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}}>
            <FlatList
                data={[questions[questionIndex]]}
                renderItem={({item}) => <PollItem poll={item}/>}
                scrollEnabled={false}
                horizontal
                pagingEnabled
             />
        </SafeAreaView>
    );

}

export default Poll;