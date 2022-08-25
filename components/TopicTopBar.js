import {Text, View } from 'react-native';
import { TopicTopBarStyle } from '../Style';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const TopicTopBar = ({title, onPress}) => (
    <View style={TopicTopBarStyle.container}>
        <View style={TopicTopBarStyle.firstRow}>
            <View style={{position:'absolute', marginLeft:10, zIndex:1}}>
                <TouchableOpacity onPress={onPress}>
                    <Ionicons name='arrow-back-circle' size={30} color={"#000"}/>
                </TouchableOpacity>
            </View>
            <View style={{width:'100%', alignItems:'center', zIndex:0}}>
                <Text>{title}</Text>
            </View>
        </View>
    </View>
    
);

/*const Styles = StyleSheet.create({
    container: {
        backgroundColor:'#FE7E6D',
        paddingTop: Platform.OS == 'android' ? SB_HEIGHT : 0,
        height:'15%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        zIndex:1000,
        width:'100%',
        marginBottom:20,
        justifyContent:'space-around'
    },
    firstRow: {
        alignItems:'center',
        flexDirection:'row',
        position:'relative'
    }
})*/