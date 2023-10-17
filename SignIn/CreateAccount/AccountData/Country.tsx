import {
    Animated,
    FlatList,
    Keyboard,
    KeyboardAvoidingView, Platform, Pressable,
    SafeAreaView,
    StyleSheet, Text, TouchableWithoutFeedback,
    View
} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useRef, } from "react";
import Countries from "./Countries";
import {useCustomDropdownContext} from "./DropdownContext";
import CountryDropdown from "./CountryDropdown";
import ZoneDropdown from "./ZoneDropdown";
import SchoolDropdown from "./SchoolDropdown";
const Country = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {currentSchool, currentZone,
        currentGrade,
        setCurrentGrade, currentCountry,
        setIsOpenCountry, setIsOpenClass, setIsOpenGrade,
        setIsOpenZone, setIsOpenSchool
    } = useCustomDropdownContext();


    const scrollX = useRef(new Animated.Value(0)).current;

    //To know when the user has scrolled to the next slide
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentGrade(viewableItems[0].item.value);

    }).current;


    return (
        <TouchableWithoutFeedback onPress={() => {
            setIsOpenCountry(false);
            setIsOpenZone(false);
            setIsOpenSchool(false);
            setIsOpenGrade(false);
            setIsOpenClass(false);

            Keyboard.dismiss();
        }}>
        <SafeAreaView style={style.page}>

            <View style={{flex: 20, justifyContent: 'flex-start'}}>
                <View style={{marginTop:'8%', marginBottom: '8%'}}>
                <Text style={{color: 'white', fontSize: 28, marginHorizontal: '5%', }}>
                    De unde esti?
                </Text>
                </View>

                {/*The Country and Zone Row*/}
                <View style={{flexDirection:'row', height: 100}}>
                <CountryDropdown options={Countries}/>
                    <ZoneDropdown options={currentCountry.zones}/>
                </View>

                {/*The Grade Text*/}
                <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: '15%', marginRight: "2%"}}>
                <Text style={{color: 'white',
                    opacity: currentCountry !== Countries[0] && currentZone !== Countries[0].zones[0] && currentSchool !== Countries[0].zones[0].schools[0] ? 1 : 0.2,
                    alignSelf: 'flex-end', fontSize: 16}}>Clasa</Text>
                </View>

                {/*The School Row*/}
                <View style={{height: 120, flexDirection: 'row',}}>
                    {/*The School Dropdown*/}
                    <View style={{flex:24}}>
                        <SchoolDropdown options={currentZone.schools}/>
                    </View>

                    {/*The Grade Flatlist*/}
                    <View style={{flex:3, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 5}}>
                        <FlatList
                        scrollEnabled={currentCountry !== Countries[0] && currentZone !== Countries[0].zones[0] && currentSchool !== Countries[0].zones[0].schools[0]}
                        bounces={false}

                        pagingEnabled
                        onScroll={
                        Animated.event(
                                    [{
                                        nativeEvent: {
                                            contentOffset: {x: scrollX}
                                        }
                                    }],
                                    {useNativeDriver: false},
                                )}
                        scrollEventThrottle={1}
                        scrollToOverflowEnabled={false}
                        onViewableItemsChanged={viewableItemsChanged}
                        data={
                            [
                                {id: '0', value: 9},
                                {id: '1', value: 10},
                                {id: '2', value: 11},
                                {id: '3', value: 12},
                            ]
                        }

                        renderItem = {({item}) =>
                        (<TouchableWithoutFeedback style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white'}}>
                            <View style={{alignItems:'center', justifyContent:'center', height: 50}}>
                            <Text style={{color: 'white', fontSize: 26, textAlign:'center', includeFontPadding: false}}>{item.value}</Text>
                            </View>
                        </TouchableWithoutFeedback>)}

                        style={[style.gradeView, {opacity: currentCountry !== Countries[0] && currentZone !== Countries[0].zones[0] && currentSchool !== Countries[0].zones[0].schools[0] ? 1 : 0.2}]}
                        keyExtractor={item => item.id}
                        />
                        </View>

            </View>

            </View>
            <View
                style={{flex: 3, justifyContent:'flex-end'}}>
                {
                    currentCountry !== Countries[0] && currentZone !== Countries[0].zones[0] && currentSchool !== Countries[0].zones[0].schools[0] && currentGrade !== 0 ?
                        <Pressable
                            onPress={() => navigation.navigate('AccountCreation')}
                            style={[style.button, {backgroundColor: 'white'} ]}>
                            <Text style={style.buttonText}>Continua</Text>
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

export default Country;

const style = StyleSheet.create({
        page:{
            flex: 1,
            backgroundColor: '#000',
        },

        header:{
            flex: 1,
        },

        gradeView:{
            height: '10%',
            width: '100%',
            borderWidth: 0.8,
            borderColor: 'white',
            borderRadius: 10,
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
