import React, {useState} from "react";
import {Pressable, View, Text, SafeAreaView, StyleSheet} from "react-native";
import {questionType, useContextPoll} from "./PollContext";
import {Image} from "expo-image";
import {userDataType} from "./PollContext";
import {CommonActions, ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {PollsDone} from "./PollFunctions";
import {useContextMetadata} from "../../MetadataContext";
import {Ment} from "./PollContext";

interface selectedAnswerDataType {
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;

    questionIndex: number;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;

    ments: Ment[];
    setMents: React.Dispatch<React.SetStateAction<Ment[]>>;

    questions: questionType[];
    navigation: any;
    currentUser: string;
    pollIndex: number;
}

const PollAnswers = ({index, data}: {
    index: number,
    data: selectedAnswerDataType,
}) => {

    const answer: userDataType = data.questions[data.questionIndex].options[index];
    const question = data.questions[data.questionIndex].question;
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Pressable
            disabled={loading === true}
            onPress={async () => {

                if (data.selected !== index)
                    data.setSelected(index);

                else {
                    data.setSelected(-1);

                    const options = data.questions[data.questionIndex].options.map(option => option.userUID);

                    data.setMents([...data.ments,
                        {
                            to: answer.userUID,
                            question: question,
                            options: options
                        }
                    ]);

                    if (data.questionIndex + 1 === 12) {
                        setLoading(true);

                        await PollsDone(Math.max(0, data.pollIndex), data.currentUser, data.ments);

                        data.setQuestionIndex(0);
                        data.setMents([]);

                        setLoading(false);

                        data.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{name: 'PollDone'}],
                            })
                        );
                    } else
                        data.setQuestionIndex(data.questionIndex + 1);
                }
            }}
            style={[style.option, {backgroundColor: data.selected === index ? 'rgba(11,107,25,0.36)' : null}]}>

            <Image source={{uri: answer.userPhoto}} style={style.image}/>
            <Text style={[style.optionText, {}]} numberOfLines={3}>{answer.userName}</Text>
        </Pressable>
    )
}

const Poll = () => {
    const {ments, setMents} = useContextPoll();
    const [selected, setSelected] = useState<number>(-1)
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const {questions} = useContextPoll();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {pollIndex} = useContextPoll();


    const {currentUser} = useContextMetadata();

    const poll = questions[questionIndex];

    const data = {
        selected, setSelected,
        questionIndex, setQuestionIndex,
        ments, setMents,
        questions,
        navigation,
        currentUser,
        pollIndex
    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{flex: 4}}>
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    alignSelf: 'center',
                    marginVertical: '5%'
                }}>{questionIndex + 1} / {questions.length}</Text>
                <Text style={style.pollText} numberOfLines={2}>{poll.question}</Text>
            </View>

            <>
                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <PollAnswers index={0} data={data}/>
                    <PollAnswers index={1} data={data}/>
                </View>

                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <PollAnswers index={2} data={data}/>
                    <PollAnswers index={3} data={data}/>
                </View>
            </>

        </SafeAreaView>
    );

}

export default Poll;

const style = StyleSheet.create({
    poll: {
        flex: 1,
    },
    pollText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
        flexShrink: 1,
    },
    option: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#0b6b19',
        borderWidth: 2,
        margin: '2%',
        borderRadius: 25,
        height: '90%'
    },
    image: {
        borderRadius: 15,
        width: 70,
        height: 70,
        marginBottom: '5%',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
        flexShrink: 1,
        textAlign: 'center',
        alignSelf: 'center',
        marginHorizontal: '5%',
    }
});