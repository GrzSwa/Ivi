import {StyleSheet,Text, View, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get("screen").width

export const LessonBox = (props)=> {     
    return(
        <Shadow distance={3}>
            <View style={[styles.box, {borderRadius:25}]}>
                <View style={styles.desc}>
                    <Text>{props.rules[props.i].Opis}</Text>
                </View>
            </View>
        </Shadow>
    )}

const styles = StyleSheet.create({
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
})