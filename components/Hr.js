import { Text, View } from 'react-native'
import React from 'react'

const Hr = (props) => {
    return (
        <View style={{width: props.width ? props.width :'100%', flexDirection:'row'}}>
            <View style={{flex:2, alignItems:'flex-end', justifyContent:'center'}}>
                <View style={
                    {
                        width: props.width ? props.width : props.widthLineLeft ? props.widthLineLeft : '90%', 
                        height: props.height ? props.height : 1, 
                        backgroundColor: props.colorLine ? props.colorLine : props.colorLineLeft ? props.colorLineLeft : '#000'
                    }}/>
            </View> 

            <View>
                <Text style={{
                    color: props.color ? props.color : '#000',
                    fontWeight: props.fontWeight ? props.fontWeight : 'normal',
                    fontSize: props.fontSize ? props.fontSize : 12,
                    paddingLeft: props.spaceLabel ? props.spaceLabel : 5,
                    paddingRight: props.spaceLabel ? props.spaceLabel : 5
                }}>{props.label ? props.label : 'Horizontal line'}</Text>
            </View>

            <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}}>
                <View style={
                    {
                        width: props.width ? props.width : props.widthLineRight ? props.widthLineRight : '90%', 
                        height: props.height ? props.height : 1, 
                        backgroundColor: props.colorLine ? props.colorLine : props.colorLineRight ? props.colorLineRight : '#000'
                    }}/>
            </View> 
        </View>
    )
}

export default Hr
