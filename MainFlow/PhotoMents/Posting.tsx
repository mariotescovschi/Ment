import {View, StyleSheet, FlatList} from "react-native";
import {useState} from "react";
import {Image} from "expo-image";

export const Posting = () => {

    const [postedPhoto, setPostedPhoto] = useState('');
    const [postedPhotoMents, setPostedPhotoMents] = useState(["Mario", "Ariana", "Gebz"]);

    return (
        <View style={style.page}>
            {/* Poza postata */}
            <View style={style.header}>
                <Image source={{uri: postedPhoto}} style={{width: 100, height: 100}}/>
            </View>

            {/* Bara postari */}
            <View style={style.content}>
                <FlatList
                    data={postedPhotoMents}
                    renderItem={({item}) =>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={{uri: item}} style={{width: 50, height: 50}}/>
                        </View>
                    }/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 5,

    }
});