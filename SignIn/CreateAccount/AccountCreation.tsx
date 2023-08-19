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
import {FIREBASE_AUTH} from "../../FireBaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import create = StyleSheet.create;


const AccountCreation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const auth= FIREBASE_AUTH;

    const signUp = async() =>{
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            const user=auth.currentUser;
            await sendEmailVerification(user);
            alert('Check your emails');
        } catch(error){
            console.log(error);
            alert('Deja ai cont boule');
        } finally {
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={style.page}>
            <View style={style.inputView}>
                <TextInput value={email} style={style.input} autoCapitalize="none" placeholder="Email" placeholderTextColor="white" onChangeText={(text) => setEmail(text)}/>
                <TextInput secureTextEntry={true} value={password} style={style.input} autoCapitalize="none" placeholder='Parola' placeholderTextColor="white" onChangeText={(text) => setPassword(text)}/>
            </View>
            <View style={style.loginButton}>
            <Pressable
                onPress={() =>
                    signUp()}
                
                style={style.button}>
                <Text style={style.buttonText}>Inregistreaza-te</Text>
            </Pressable>
                </View>
        </SafeAreaView>

    );
}

export default AccountCreation;

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
            flex: 5,
            justifyContent: 'center',
        },

        loginButton: {
            flex: 10,
            justifyContent: 'flex-end',
        }
    }
);
