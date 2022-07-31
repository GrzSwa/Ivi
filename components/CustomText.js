import { Text, View } from 'react-native'
import React from 'react'

export const CustomText = ({title, underlineStyle, titleStyle}) => (
    <View style={{alignItems:'center'}}>
        <Text style={titleStyle}>{title}</Text>
        <View style={underlineStyle}></View>
    </View>
)