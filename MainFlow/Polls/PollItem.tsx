import {View, StyleSheet, Text, Dimensions} from "react-native";
import {questionType} from "./PollContext";

const screenWidth = Dimensions.get('window').width;

const PollItem = ({ poll }: {poll: questionType})=> {
    return (
        <View style={style.poll}>
            <View style={{flex: 5, backgroundColor: 'yellow'}}>
            <Text style={style.pollText}>{poll.question}</Text>
            </View>
            <View style={style.optionsContainer}>
                {poll.options.map((option, index) => (
                    <View key={index} style={[style.option]}>
                        <Text style={style.optionText}>{option.userName}</Text>
                    </View>
                ))}
            </View>

            <View style={{flex: 1, backgroundColor: 'green'}}/>
        </View>
    );
}

const style = StyleSheet.create({
    poll: {
        backgroundColor: 'white',
        flex: 1,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pollText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    optionsContainer: {
        flex: 8,
        backgroundColor: 'red',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    option: {
        margin: '2%',
        width: '46%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green', // Set the diamond background to green
        color: 'white',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
    }
});

export default PollItem;