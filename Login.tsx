import {
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {FIREBASE_AUTH} from './FireBaseConfig';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';


const Login = () => {
    const [phone, setPhone] = useState('');
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
        <View style={styles.container}>
            <KeyboardAvoidingView behavior = 'padding'>
            <TextInput value={email} style={styles.input}  placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} autoCapitalize="none" placeholder='Password' onChangeText={(text) => setPassword(text)}></TextInput>
            {loading ?
                (<ActivityIndicator size="large" color="#0000ff"/>
            ):(
                <>
                <Button title="Login" onPress={() => signIn()} />
                <Button title="SignUp" onPress={() => signUp()} />
                </>
                )
                }
            </KeyboardAvoidingView>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#000',
    },
    button:{
        textAlign: 'center',
        color: '#fff',
        fontSize: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        paddingHorizontal: 155,
        paddingVertical: 10,
        borderColor: '#fff',
    },
    container: {
        marginHorizontal:20,
        flex:1,
        justifyContent: 'center'
    },
    input: {
        marginVertical:4,
        height:50,
        borderWidth: 1,
        borderRadius:4,
        padding: 10,
        backgroundColor: '#fff'
    }
    }
);
