import {Text, View, StatusBar, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Shadow } from 'react-native-shadow-2';

const SB_HEIGHT = StatusBar.currentHeight;

export const TopicTopBar = ({title, onPress, navigation}) => (
    <View style={styles.container}>
        <View style={styles.firstRow}>
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

const styles = StyleSheet.create({
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
})