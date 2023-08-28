import {
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    View, Platform
} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState,} from "react";

const Name = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    return (
        <SafeAreaView style={style.page}>
            <View style={style.inputView}>
                <View style={{marginTop: '10%', marginBottom: '2%', marginLeft: '5%'}}>
                <Text style={{color: 'white', fontSize: 26, marginVertical: '2%'}}>
                    Cum te numesti?
                </Text>

                <Text style={{color: 'grey', fontSize: 18}}>
                     Pentru a fi usor de recunoscut de colegii tai.
                </Text>
                </View>

                {/*First name input>*/}
            <TextInput
                value={firstName}
                style={[style.input, {marginTop: '6%'}]}
                autoCapitalize="none"
                placeholder="Prenume"
                placeholderTextColor="#696969"
                onChangeText={(text) => setFirstName(text)}/>


                {/*Last name input>*/}
            <TextInput
                    value={lastName}
                    style={style.input}
                    autoCapitalize="none"
                    placeholder="Nume de familie"
                    placeholderTextColor="#696969"
                    onChangeText={(text) => setLastName(text)}/>
            </View>



            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 3, justifyContent:'flex-end'}}>
                <Pressable
                    onPress={() => navigation.navigate('Country', {firstName: firstName, lastName: lastName})}
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
