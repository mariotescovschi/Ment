import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    View, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FireBaseConfig";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {useCustomDropdownContext} from "./AccountData/DropdownContext";
import {useContinueContext} from "./ContinueContext";
import {setDoc, doc} from "firebase/firestore";

const AccountCreation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const {currentSchool, currentZone, currentGrade, currentCountry} = useCustomDropdownContext();
    const {name, lastName} = useContinueContext();
    const auth = FIREBASE_AUTH;
    const database = FIRESTORE_DB;
    const signUp = async() =>{
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            const user= auth.currentUser;
            if (user) {
               await setDoc(doc(database, "users", user.uid), {
                  name: name,
                  lastName: lastName,
                  country: currentCountry.name,
                  zone: currentZone.name,
                  school: currentSchool.name,
                  grade: currentGrade,
                  photo: 'ProfilePictures/icons8-customer-50.png'
               });

               await setDoc(doc(database, "groups", currentCountry.name, currentZone.name, currentSchool.name, currentGrade.toString(), user.uid), {
                  name: name,
                  lastName: lastName,
                  score: 0,
               });
            }
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
        <TouchableWithoutFeedback
            onPress={() => {
            Keyboard.dismiss();
        }}>
        <SafeAreaView style={style.page}>
            <View style={style.inputView}>
                <Text style={{color: 'white', fontSize: 26, marginHorizontal: '5%', marginTop: '8%', marginBottom: '8%', textAlign: 'center'}}>
                    Seteaza adresa de email si parola</Text>
                <TextInput value={email} style={style.input} autoCapitalize="none" placeholder="Email" placeholderTextColor="grey" onChangeText={(text) => setEmail(text)}/>
                <TextInput secureTextEntry={true} value={password} style={style.input} autoCapitalize="none" placeholder='Parola' placeholderTextColor="grey" onChangeText={(text) => setPassword(text)}/>
            </View>
            <View

                style={{flex: 3, justifyContent:'flex-end'}}>
                {
                    email !== '' && password !== '' ?
                        <Pressable
                            onPress={() => {
                                signUp();
                                navigation.navigate('Login');}}
                            style={[style.button, {backgroundColor: 'white'} ]}>
                            <Text style={style.buttonText}>Inregistreaza-te</Text>
                        </Pressable>
                        :
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={[style.button, {backgroundColor: 'grey', borderColor: 'black'}]}>
                            <Text style={style.buttonText}>Înapoi</Text>
                        </Pressable>
                }
            </View>

        </SafeAreaView>
    </TouchableWithoutFeedback>
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
        },

        loginButton: {
            flex: 10,
            justifyContent: 'flex-end',
        }
    }
);
