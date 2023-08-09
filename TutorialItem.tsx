import {Text, View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import slides from "./slides";
import Paginator from "./Paginator";

const TutorialItem = ({item}) => {
    const {width} = useWindowDimensions();
    return(
        <View style ={style.container}>
        <Image
            source={item.image}
            style={[style.image, {width, resizeMode: 'contain'}]}/>
        <View style={{height: '20%'}}>
        <Text style={style.title}>{item.title}</Text>
        <Text style={style.description}>{item.description}</Text>
        </View>
        </View>
    );
}

export default TutorialItem;


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        height: '80%',
        width: 100,
        justifyContent: 'center',
    },
    title:{
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
    },
    description:{
        fontWeight: '300',
        color: '#fff',
        textAlign: 'center',
    }
});
