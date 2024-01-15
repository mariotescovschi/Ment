import {Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import CustomText from "../../../assets/CustomText";
import React from "react";
import {useContextAddFriends} from "../../../AddFriendsContext";
import {Image} from "expo-image";
import {FIRESTORE_DB} from "../../../FireBaseConfig";
import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {useContextMetadata} from "../../../MetadataContext";
import {cacheObject} from "../../../CachingFunctions";
import add = Animated.add;
import firebase from "firebase/compat";
import FieldValue = firebase.firestore.FieldValue;

const AddFriends = () => {
    const db = FIRESTORE_DB;
    const {currentUser} = useContextMetadata();
    const mapType = [['suggestions', 'requestsSent'], ['friends', 'suggestions'], ['friendRequests', 'friends']];
    const [typeMap, setTypeMap] = React.useState(0);
    {/*
    const fetchFriendsMap = async (userId) => {
        try {
            const userDocRef = doc(db, 'friendList', userId);
            const userDocSnap = await getDoc(userDocRef);
            console.log('UserDocSnap:', userDocSnap);
            if (userDocSnap.exists()) {
                const friendsMap = userDocSnap.data().friends; // Assuming the map field is named 'friends'
                console.log('Friends Map:', friendsMap);
                return friendsMap;
            } else {
                console.log('No such document for the user');
                console.log(currentUser);
                return null;
            }
        } catch (error) {
            console.error('Error fetching friends map:', error);
            return null;
        }
    };

    fetchFriendsMap(currentUser).then((friendsMap) => {
        if (friendsMap) {
            const friendsArray = Object.keys(friendsMap).map((key) => {
                console.log('Key:', key);
                console.log(friendsMap.hasOwnProperty(key));
            });
        }
    });
*/}
    const addFriend = async (userId, friendId) => {
        try {
            const userDocRef = doc(db, 'friendList', userId);
            const toDelete = mapType[typeMap][0] + '.' + friendId;
            const toAdd = mapType[typeMap][1] + '.' + friendId;
            console.log(toAdd + ' ' + toDelete);
            await updateDoc(userDocRef, {
                [toAdd] : true,
                [toDelete] : FieldValue.delete(),
        });
            console.log('Successfully added friend');
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }

    const {userGroup} = useContextAddFriends();
    return(
        <SafeAreaView style={style.page}>
            <View style={style.header}>
                <CustomText style = {style.title}> MENT </CustomText>
            </View>
            <View style={style.content}>
                <View style={style.perspectiveButtons}>
                    <Pressable style={{flex: 1}}
                        onPress={() => {
                            setTypeMap(0);
                        }}>
                <Text style={{color: 'white', flex: 1, textAlign: 'center'}}>Suggestions</Text>
                    </Pressable>

                    <Pressable style={{flex: 1}}
                        onPress={() => {
                            setTypeMap(1);
                        }}>
                <Text style={{color: 'white', flex: 1, textAlign: 'center'}}>Friends</Text>
                    </Pressable>

                    <Pressable style={{flex: 1}}
                        onPress={() => {
                            setTypeMap(2);
                        }}>
                <Text style={{color: 'white', flex: 1, textAlign: 'center'}}>Requests</Text>
                    </Pressable>
                </View>

                <View style = {style.people}>
                <FlatList
                    data={userGroup}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{flex:1}}>
                        <View style={style.person}>
                            <Image
                                source={{ uri: item.photo }}
                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                cachePolicy={'memory-disk'}/>
                            <View style={style.information}>
                            <Text style={{color: 'white', fontSize: 16}}>{item.name}</Text>
                            <Text style={{color: 'white', fontSize: 12}}>Nickname</Text>
                            <Text style={{color: 'white', fontSize: 10}}>Common Friends</Text>
                            </View>

                            <View style={style.addOrRemove}>

                                <Pressable onPress={() => {
                                    console.log(item.name);
                                    addFriend(currentUser, item.id);

                                }}>
                                <Text style={{color: 'white', fontSize: 24, padding: 5}}>+</Text>
                                </Pressable>

                                <Text style={{color: 'white', fontSize: 24, padding: 5}}>x</Text>


                                </View>
                        </View>
                        </View>

                    )}
                />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default AddFriends;

const style = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center children horizontally
    },
    addOrRemove: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleContainer: {
        //backgroundColor: 'red', // For testing purposes
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center children horizontally
    },
    profileMenuContainer: {
        //backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end', // Center children horizontally
    },
    title: {
        fontSize: 35,
        color: '#fff',
    },
    content: {
        flex: 18,
        justifyContent: 'center',
    },
    profileMenu: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: '15%',
    },
    person: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    perspectiveButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    people: {
      flex: 45,
    },
    information: {
        flex: 6,
        marginLeft: 10,
    },
});