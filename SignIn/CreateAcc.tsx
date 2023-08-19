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
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {FIREBASE_AUTH} from '../FireBaseConfig';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import slides from "./Intro/slides";
import CustomText from "../assets/CustomText";


const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const auth=FIREBASE_AUTH;

    const signIn = async() =>{
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch(error){
            console.log(error);
            alert('SignIn Failed!');
        } finally {
            setLoading(false);
        }
    }
    const signUp = async() =>{
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails');
        } catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <SafeAreaView style={style.page}>

            {/* The header */}
            <View style={style.header}>
                <View style={{width: '33%'}}/>

                <CustomText style = {style.title}> MENT </CustomText>

                <View style={{width: '33%'}} />
            </View>

            {/* Empty space */}
            <View style={{flex: 1}}/>

            {/* Inputs */}
            <View style={style.content}>
                <View style={style.inputView}>
                    <TextInput value={email} style={style.input} autoCapitalize="none" placeholder="Email" placeholderTextColor="white" onChangeText={(text) => setEmail(text)}></TextInput>
                    <TextInput secureTextEntry={true} value={password} style={style.input} autoCapitalize="none" placeholder='Parola' placeholderTextColor="white" onChangeText={(text) => setPassword(text)}></TextInput>
                </View>
            </View>

            <View style={style.loginButton}>
                {loading ?
                    (<ActivityIndicator size="large" color="#fff"/>
                    ):(
                        <Pressable onPress={() => signUp()} style={style.button}>
                            <Text style={style.buttonText}> Create Account </Text>
                        </Pressable>)
                }

            </View>
        </SafeAreaView>
    );
}

export default Login;

const style = StyleSheet.create({
        page:{
            flex: 1,
            backgroundColor: '#000',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
        },

        createAccount:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },

        forgotPassword:{

            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        header: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },

        title: {
            includeFontPadding: false,
            color: '#fff',
            fontSize: 40,
            textAlign: 'center',
            alignSelf: 'center',
            width: '33%',
        },

        button:{
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 50,
            backgroundColor: '#fff',
            margin: '2%',
        },

        buttonText:{
            textAlign: 'center',
            fontSize: 20,
            margin: '2.5%',
            color: 'black',
        },

        content: {
            flex: 10,
        },

        input: {
            textAlign: 'center',
            height: 40,
            margin: '2%',
            color: '#fff',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 50,
            fontSize: 15,
        },

        inputView: {
            flex: 1,
            justifyContent: 'center',
        },

        loginButton: {
            flex: 2,
            justifyContent: 'flex-end',
        }
    }
);
