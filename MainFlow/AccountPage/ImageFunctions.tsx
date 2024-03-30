import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";
import {updateProfile} from "firebase/auth";
import React from "react";
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";

/**
 * Converts a URI to a Blob object.
 * @param {string} uri - The URI to convert.
 * @returns {Promise<Blob>} The Blob object.
 */
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

/**
 * Uploads an image to Firebase Storage and updates the user's profile with the new image URL.
 * @param {string} uri - The URI of the image to upload.
 * @param {any} database - The Firebase Firestore database.
 * @param {any} currentUser - The current user.
 * @param {React.Dispatch<React.SetStateAction<string>>} setUserPhoto - The function to update the user's photo in the state.
 */
const uploadImage = async (uri: string, database: any, currentUser: any, setUserPhoto: React.Dispatch<React.SetStateAction<string>>) => {

    const startTime = performance.now();

    const blob = await uriToBlob(uri);

    const storageRef = ref(getStorage(), 'ProfilePictures/' + currentUser.uid);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed',
        (snapshot) => {
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
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                const userRef = doc(database, "users", currentUser.uid);

                updateDoc(userRef, {
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

/**
 * Resizes an image to a specific width and height.
 * @param {string} uri - The URI of the image to resize.
 * @returns {Promise<string>} The URI of the resized image.
 */
const resizeImage = async (uri: string): Promise<string> => {
    const resizedImage = await manipulateAsync(
        uri,
        [{resize: {width: 800, height: 450}}],
        {compress: 0.8, format: SaveFormat.PNG}
    );
    return resizedImage.uri;
};

/**
 * Opens the image library, allows the user to pick an image, resizes the image, and uploads it to Firebase Storage.
 * @param {any} database - The Firebase Firestore database.
 * @param {any} currentUser - The current user.
 * @param {React.Dispatch<React.SetStateAction<string>>} setUserPhoto - The function to update the user's photo in the state.
 */
export const pickImage = async (database: any, currentUser: any, setUserPhoto: React.Dispatch<React.SetStateAction<string>>) => {
    const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
    });

    if (!result.canceled) {
        const image = await resizeImage(result.assets[0].uri);
        await uploadImage(image, database, currentUser, setUserPhoto);
    }
}