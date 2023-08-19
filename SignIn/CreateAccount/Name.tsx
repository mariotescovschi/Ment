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
import {FIREBASE_AUTH} from '../../FireBaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import CustomText from "../../assets/CustomText";


const Name = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    return (
        <SafeAreaView style={style.page}>
            <View style={style.inputView}>
                <Text style={{color: 'white', fontSize: 24, marginHorizontal: '2%', marginVertical: '2%'}}>
                    Cum te numesti?
                </Text>

                <Text style={{color: 'grey', fontSize: 18, marginHorizontal: '2%'}}>
                    Introdu numele tau real.
                </Text>

            <TextInput
                value={firstName}
                style={[style.input, {marginTop: '6%'}]}
                autoCapitalize="none"
                placeholder="Prenumele"
                placeholderTextColor="#696969"
                onChangeText={(text) => setFirstName(text)}/>

            <TextInput
                    value={lastName}
                    style={style.input}
                    autoCapitalize="none"
                    placeholder="Numele de familie"
                    placeholderTextColor="#696969"
                    onChangeText={(text) => setLastName(text)}/>
            </View>



            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 3, justifyContent:'flex-end'}}>
                <Pressable
                    onPress={() => navigation.navigate('School', {firstName: firstName, lastName: lastName})}
                    style={style.button}>
                    <Text style={style.buttonText}>Continua</Text>
                </Pressable>
                </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

export default Name;

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
