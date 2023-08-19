import {
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    View, Keyboard, Platform
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {ParamListBase, useFocusEffect, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState, useEffect, useCallback} from "react";
import CustomText from "../../assets/CustomText";
import {SelectList} from 'react-native-dropdown-select-list';
import Countries from "./AccountData.js";
const School = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [firstName, setFirstName] = useState('');
    const [school, setSchool] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [grade, setGrade] = useState('');
    const [section, setSection] = useState('');
    const [selected, setSelected] = useState('');
    return (
        <SafeAreaView style={style.page}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 24}}>
                    Salut, {firstName}!
                </Text>
                <Text style={{color: 'white', fontSize: 24}}>
                    De unde esti?
                </Text>
            </View>
            <View style={{flex: 1, flexDirection:'row'}}>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={Countries}
                    save= 'value'
                    inputStyles={{fontSize: 20, color: 'white'}}
                    dropdownTextStyles={{fontSize: 20, color: 'white'}}
                    dropdownStyles={{height: 100}}
                />

            </View>

            <View style={{flex: 1, flexDirection:'row'}}>
                <TextInput
                    value={firstName}
                    style={[style.input, {flex: 1, marginHorizontal: '2%'}]}
                    autoCapitalize="none"
                    placeholder="Scoala"
                    placeholderTextColor="#696969"
                    onChangeText={(text) => setFirstName(text)}/>

                <TextInput
                    value={firstName}
                    style={[style.input, {flex: 1, marginHorizontal: '2%'}]}
                    autoCapitalize="none"
                    placeholder="Scoala"
                    placeholderTextColor="#696969"
                    onChangeText={(text) => setFirstName(text)}/>

                <TextInput
                    value={firstName}
                    style={[style.input, {flex: 1, marginHorizontal: '2%'}]}
                    autoCapitalize="none"
                    placeholder="Scoala"
                    placeholderTextColor="#696969"
                    onChangeText={(text) => setFirstName(text)}/>

            </View>
            <View style={{flex: 1}}>
                <Pressable

                    onPress={() => navigation.navigate('AccountCreation')}
                    style={style.button}>
                    <Text style={style.buttonText}>Continua</Text>
                </Pressable>
            </View>
        </SafeAreaView>

    );
}

export default School;

const style = StyleSheet.create({
        page:{
            flex: 1,
            backgroundColor: '#000',
            alignItems: 'stretch',
        },

        button:{
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 50,
            backgroundColor: '#fff',
            marginHorizontal: '2%',
            marginVertical: '2%'
        },

        buttonText:{
            textAlign: 'center',
            fontSize: 20,
            margin: '2.5%',
            color: 'black',
        },
        input: {
            textAlign: 'center',
            height: 50,
            margin: '2%',
            color: '#fff',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 50,
            fontSize: 20,

        },

        inputView: {
            flex: 20,
            justifyContent: 'flex-start',
        },

        loginButton: {
            flex: 2,
            justifyContent: 'flex-end',
        }
    }
);
