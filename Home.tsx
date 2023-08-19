import { StatusBar } from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FIREBASE_AUTH} from "./FireBaseConfig";
import {signOut} from "firebase/auth";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useAuth} from "./AuthContext";
const auth = FIREBASE_AUTH;


const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    } = useAuth();
    const signOutUser = async () => {
        try {
            setIsLoggedIn(false);
            await auth.signOut();
        }
        catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={style.page}>
        <Text style={{color: 'white'}}>caca</Text>
            <Pressable
                onPress={signOutUser}
                style={{backgroundColor: 'white', padding: 10, borderRadius: 5}}>
                <Text style={{color: 'black'}}>Sign Out</Text>
            </Pressable>
        </View>
    );
}

export default Home;

const style = StyleSheet.create({
   page:{
         flex: 1,
         backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
   }
});