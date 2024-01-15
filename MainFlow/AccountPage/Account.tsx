import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {useContextMetadata} from "../../MetadataContext";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FireBaseConfig";
import {launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";
import {getDownloadURL, getStorage, ref, uploadBytesResumable, uploadBytes} from "firebase/storage";
import {Image} from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {updateProfile} from "firebase/auth";
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import firebase from "firebase/compat";
import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {useContextAddFriends} from "../../AddFriendsContext";


const Account = () => {
    const database = FIRESTORE_DB;
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {userName, userPhoto, setUserPhoto} = useContextMetadata();
    const currentUser = FIREBASE_AUTH.currentUser;

    const {userData, setUserData} = useContextMetadata();
    const resizeImage = async (uri) => {
        const resizedImage = await manipulateAsync(
            uri,
            [{ resize: { width: 800, height: 450 } }],
            {compress: 0.8, format: SaveFormat.PNG }
        );
        return resizedImage.uri;
    };

    const uploadImage = async (uri: string) => {
       const startTime = performance.now();

           const uriToBlob = (uri: string): Promise<Blob> => {
               return new Promise((resolve, reject) => {
                   const xhr = new XMLHttpRequest();
                   xhr.onload = () => {
                       resolve(xhr.response);
                   };

                   xhr.onerror = (e) => {
                       console.log(e);
                       reject(new Error('uriToBlob failed'));
                   };

                   xhr.responseType = 'blob';
                   xhr.open('GET', uri, true);
                   xhr.send(null);

               });
           };
         const blob = await uriToBlob(uri);
      //console.log(blob);
      const storageRef = ref(getStorage(), 'ProfilePictures/' + currentUser.uid);
      const uploadTask = uploadBytesResumable(storageRef, blob);
// Listen for state changes, errors, and completion of the upload.
       uploadTask.on('state_changed',
           (snapshot) => {
               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log('Upload is ' + progress + '% done');
               switch (snapshot.state) {
                   case 'paused':
                       console.log('Upload is paused');
                       break;
                   case 'running':
                       console.log('Upload is running');
                       break;
               }
           },
           (error) => {
               // A full list of error codes is available at
               // https://firebase.google.com/docs/storage/web/handle-errors
               switch (error.code) {
                   case 'storage/unauthorized':
                       // User doesn't have permission to access the object
                       break;
                   case 'storage/canceled':
                       // User canceled the upload
                       break;

                   // ...

                   case 'storage/unknown':
                       // Unknown error occurred, inspect error.serverResponse
                       break;
               }
           },
           () => {
               // Upload completed successfully, now we can get the download URL
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                   console.log('File available at', downloadURL);
                   const userRef = doc(database, "users", currentUser.uid);
                   const usersDocRef = doc(FIRESTORE_DB, "groups", userData.country, userData.zone, userData.school, userData.grade.toString(), currentUser.uid);

                   updateDoc(userRef, {
                          photo: downloadURL,
                     });

                     updateDoc(usersDocRef, {
                          photo: downloadURL,
                     });

                   updateProfile(currentUser, {
                          photoURL: downloadURL,
                   }).then(() => {
                       const cacheBustedURI = `${currentUser.photoURL}?cacheBust=${new Date().getTime()}`;
                       setUserPhoto(cacheBustedURI);
                     }).catch((error) => {
                          console.log(error);
                     });
                   const endTime = performance.now();
                   console.log('Upload took ' + (endTime - startTime) + ' ms');
               });
           }
       );


   };

   const pickImage = async () => {
      const result = await launchImageLibraryAsync({
         mediaTypes: MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [16, 9],
         quality: 0.8,
      });

      if(!result.canceled) {
          const image = await resizeImage(result.assets[0].uri);
          await uploadImage(image);
      }


   }

   return(
        <SafeAreaView style={style.page}>
            {/* The header */}
            <View style={style.header}>
                <View style={{justifyContent:'center', flex: 1, alignItems:'flex-start'}}>
                    <Pressable
                        onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/left_arrow_icon.png')} style={{width: 20, height: 20, marginHorizontal: 5}}/>
                    </Pressable>
                </View>

                <View style={{alignItems:'flex-end', flex: 1, justifyContent:'center'}}>
                    <Pressable
                        onPress={() => navigation.navigate('Settings')}>
                        <Image source={require('../../assets/settings_icon.png')} style={{width: 25, height: 25, marginHorizontal: 5}}/>
                    </Pressable>
                </View>


            </View>
            <View style={style.content}>
               <Pressable onPress={() => {pickImage()}}>
                <Image source = {{uri : userPhoto}}
                       style={style.profilePicture}
                       cachePolicy={"memory-disk"}/>
               </Pressable>
                <Text style={style.userName}>
                   {userName}
                </Text>
            </View>

        </SafeAreaView>
    );
}

export default Account;

const style = StyleSheet.create({
   page:{
        flex: 1,
        backgroundColor: '#000',
   },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    title: {
        includeFontPadding: false,
        color: '#fff',
        fontSize: 40,
    },

    content: {
        flex: 15,
        alignItems: 'center',
    },

    profilePicture: {
        width: 100,
       height: 100,
       borderRadius: 50,
       marginVertical: 10,
       //backgroundColor:'white'
    },

    userName: {
         color: 'white',
         fontSize: 20,
         marginVertical: 10,
    }
});