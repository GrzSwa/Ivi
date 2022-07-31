import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'

const WIDTH = Dimensions.get("screen").width
export const ExampleBox = (props) => {
    return (
        <Shadow distance={3}>
            <View style={[styles.box, {borderRadius:25}]}>
                <View style={styles.desc}>
                    <Text>Example</Text>
                </View>
            </View>
        </Shadow>
    )
}

const styles = StyleSheet.create({
    box:{
        width:WIDTH*0.9,
        height:400,
        backgroundColor:'#CCD1E4',
    },
    desc:{
        padding:20,
    },
})