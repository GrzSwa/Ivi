import {StyleSheet,Text, View, Dimensions} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
const WIDTH = Dimensions.get("screen").width

export const LessonBox = (props)=> (
        <Shadow>
            <View style={styles.box}>
                <Text>{props.rules[props.i].Opis}</Text>
            </View>
        </Shadow>
);

const styles = StyleSheet.create({
    box:{
        width:WIDTH*0.9,
        height:200,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        padding:20,
    }
})