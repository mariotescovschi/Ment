import {Text} from 'react-native';
import React, {useEffect, useState} from "react";
import * as Font from "expo-font";

export default function CustomText(props){
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'AsapCondensed': require('../assets/fonts/AsapCondensed-Black.ttf'),
            });

            setFontLoaded(true);
        }

        loadFont();
    }, []);

    if (!fontLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <Text style={{ ...props.style, fontFamily: 'AsapCondensed' }}>
            {props.children}
        </Text>
    );


}
