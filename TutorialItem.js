import {Text, View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import React from 'react';

const TutorialItem = ({item}) => {
    const {width} = useWindowDimensions();
    return(
        <>
    <View>
        <Image source={item.image}/>
    </View>
        </>
    );
}

export default TutorialItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        justifyContent: 'center',
        width: 300,
        height: 300,
        resizeMode: 'contain',
    }
});
