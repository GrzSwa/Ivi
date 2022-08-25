import {Text, View} from 'react-native';
import { LessonBoxStyle } from '../Style';
import { Shadow } from 'react-native-shadow-2';

export const LessonBox = (props)=> {     
    return(
        <Shadow distance={3}>
            <View style={[LessonBoxStyle.box, {borderRadius:25}]}>
                <View style={LessonBoxStyle.desc}>
                    <Text>{props.rules[props.i].Opis}</Text>
                </View>
            </View>
        </Shadow>
    )}

/*const styles = StyleSheet.create({
    box:{
        width:WIDTH*0.9,
        height:400,
        backgroundColor:'#CCD1E4',
    },
    desc:{
        width:WIDTH*0.9,
        alignItems:'center',
        justifyContent:'center',
        padding:20,
        flex:2
    }
})*/