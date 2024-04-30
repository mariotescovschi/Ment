import {View, StyleSheet, Text, Dimensions, Pressable, FlatList} from "react-native";
import {questionType, useContextPoll} from "./PollContext";
import {Image} from "expo-image";
import {useState} from "react";

const screenWidth = Dimensions.get('window').width;

const selectAnswer = (answer) => {
    console.log(answer);
}

const PollItem = ({poll}: { poll: questionType }) => {
    const {seconds, setSeconds, questionIndex} = useContextPoll();
    const {setAnswers, answers} = useContextPoll();

    return (
        <View style={style.poll}>
            <View style={{flex: 1, width: '100%'}}>
                <Text style={style.pollText}>{poll.question}</Text>
                <Text style={{color: 'white', textAlign: 'center'}}>{seconds}</Text>
            </View>
            <View style={{flex: 10}}/>
                    <FlatList
                        style={{width: screenWidth}}
                        data={poll.options}
                        renderItem={({item}) => (
                            <Pressable onPress={() => {
                                setAnswers(currentAnswers => {

                                    if (currentAnswers.length === 0)
                                        return [{question: poll.question, userData: item}];

                                    const newAnswers = [...currentAnswers];
                                    const lastPosition = newAnswers.length === 0 ? 0 : newAnswers.length - 1;
                                    newAnswers[questionIndex] = {
                                        ...newAnswers[newAnswers.length - 1],
                                        question: poll.question,
                                        userData: item
                                    };
                                    return newAnswers;
                                });
                                console.log(answers);
                            }}
                                style={style.option}>
                                <Image source={{uri: item.userPhoto}}/>
                                <Text style={style.optionText}>{item.userName}</Text>
                            </Pressable>
                        )}
                        scrollEnabled={false}
                        numColumns={2}
                    />
        </View>
    );
}

const style = StyleSheet.create({
    poll: {
        //backgroundColor: 'white',
        flex: 1,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pollText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    optionsContainer: {
        flex: 6,
        alignItems: 'flex-end',
        backgroundColor: 'white'
    },
    option: {
        flex: 2,
        height: '100%',
        margin: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        color: 'white',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
    }
});

export default PollItem;