import {Text, TouchableOpacity} from 'react-native';


export const Button = ({borderRadius, onPress, backgroundColor, fontColor, title, width, height, fontSize}) => (
    <TouchableOpacity 
        onPress={onPress} 
        style={
            {
                backgroundColor:backgroundColor, 
                borderRadius:borderRadius,
                justifyContent:'center',
                alignItems:'center',
                width:width,
                height:height
            }
        }
    >
        <Text
            style={
                {
                    fontSize:fontSize,
                    color:fontColor,
                }
            }
        >{title}</Text>
    </TouchableOpacity>
);
