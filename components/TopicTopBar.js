import {Text, View, StatusBar, StyleSheet, Dimensions} from 'react-native';
import { ProgressBar } from './ProgressBar';

const SB_HEIGHT = StatusBar.currentHeight;


export const TopicTopBar = ({title}) => (
    <View style={styles.container}>
        <View style={styles.firstRow}>
            <Text>{title}</Text>
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
    },
    firstRow: {
        padding:35,
        alignItems:'center',
    }
})