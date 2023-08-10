import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return(
        <View style={style.page}>
            <View style={style.container}>
        <Text style= {{color: '#fff'}}>caca</Text>
            <Pressable
                onPress={()=> navigation.navigate('AddFriends')}>
                 <Text style={style.button}>Continue</Text>
            </Pressable>
                </View>
        </View>
    );
}

export default Login;

const style = StyleSheet.create({
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
    }
);
