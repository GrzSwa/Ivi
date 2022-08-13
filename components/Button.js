import { useEffect, useState } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';


export const Button = ({borderRadius, onPress, backgroundColor, fontColor, title, width, height, fontSize, styles, fontStyle}) => (
    <TouchableOpacity
        onPress={onPress} 
        style={
           [ {
                backgroundColor:backgroundColor, 
                borderRadius:borderRadius,
                justifyContent:'center',
                alignItems:'center',
                width:width,
                height:height
            },
            styles
            ]
        }
    >
        <Text
            style={
                [{
                    fontSize:fontSize,
                    color:fontColor,
                },
                fontStyle
            ]
            }
        >{title}</Text>
    </TouchableOpacity>
);

export const ButtonGroup = (props) => {

    const[isFocused, setIsFocused] = useState(undefined);
    const handleClick = (item, index) =>{
        setIsFocused(index)
        props.onPress(props.index, item);
    }

    return(
    <View style={props.buttonContainerStyle}>
        {
            props.buttonsLabel.map( (btn, index) => {
                return(
                    <TouchableOpacity
                    key={index} 
                    onPress={()=>handleClick(btn,index)}
                    style={isFocused === index ? props.styleFocused : props.style}>
                        <Text style={props.fontStyle}>{btn}</Text>
                    </TouchableOpacity>
                )
            })
        }
    </View>
    )
};
