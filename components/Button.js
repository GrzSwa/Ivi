import {Text, TouchableOpacity} from 'react-native';


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
