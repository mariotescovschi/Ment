import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomText from "../../assets/CustomText";
import React from "react";
import {Posting} from "./Posting";
import {useContextMetadata} from "../../MetadataContext";


const PhotoFeed = () => {
    const {currentPhotoMent} = useContextMetadata();
    return(
        <SafeAreaView style={style.page}>
            <View style={style.header}>
                <CustomText style = {style.title}> MENT </CustomText>
            </View>
            <View style={style.content}>
                {/*currentPhotoMent data */}
                <Text style={{color: 'white'}}>{currentPhotoMent.topic}</Text>
            </View>
        </SafeAreaView>
    );
}

export default PhotoFeed;

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
        alignItems: 'center',
    },
    profileMenu: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: '15%',
    },
});