import {View, StyleSheet, Animated, useWindowDimensions} from 'react-native';
import React from 'react';

const Paginator = ({data, scrollX}) => {
    const {width} = useWindowDimensions();
      return(
          <View style= {style.paginator}>
              {data.map((_, i) => {
                  const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                  const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 12, 10],
                        extrapolate: 'clamp',
                  });

                  const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                  });


                  return <Animated.View
                      key={i.toString()}
                      style={[style.dot, {width: dotWidth, opacity}]}/>
              }
              )}
          </View>
    );
}

export default Paginator;


const style = StyleSheet.create({
    paginator: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
    },
    dot:{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: '2%',
    }
});
