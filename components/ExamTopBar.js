import {Text, View, StatusBar, StyleSheet, Dimensions, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
const SB_HEIGHT = StatusBar.currentHeight;

const ExamTopBar = ({title, onPress, sendTimeToParent},ref) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true);  
    const timerRef = useRef(0);

    useImperativeHandle(ref, () => ({
        stopTimer: () => { stopTimer() },
    }))

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setTime((cur) => cur + 10);
            }, 10);
        } else 
            clearInterval(timerRef.current);

        return () => clearInterval(timerRef.current);
    }, [running]);

    const showMinute = () => (
        <Text style={styles.timerStyle}>
            {Math.floor((time/60000) % 60) < 10 ? "0" + Math.floor((time/60000) % 60) : Math.floor((time/60000) % 60)}
        </Text>
    );

    const showSecond = () => (
        <Text style={styles.timerStyle}>
            {Math.floor((time/1000) % 60) < 10 ? "0" + Math.floor((time/1000) % 60) : Math.floor((time/1000) % 60)}
        </Text>
    );

    const showMiliseconds = () => (
        <Text style={styles.timerStyle}>
            {Math.floor((time/10) % 100) < 10 ? "0" + Math.floor((time/10) % 100) : Math.floor((time/10) % 100)}
        </Text>
    );

    const stopTimer = () =>{
        let min = Math.floor((time/60000) % 60) < 10 ? "0" + Math.floor((time/60000) % 60) : Math.floor((time/60000) % 60);
        let sec = Math.floor((time/1000) % 60) < 10 ? "0" + Math.floor((time/1000) % 60) : Math.floor((time/1000) % 60)
        let ms = Math.floor((time/10) % 100) < 10 ? "0" + Math.floor((time/10) % 100) : Math.floor((time/10) % 100)
        sendTimeToParent(min+':'+sec+':'+ms)
        setRunning(false);
    }

    const Show = () =>{
        return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
                {showMinute()}
                <Text>:</Text>
                {showSecond()}
                <Text>:</Text>
                {showMiliseconds()}
            </View>
        )
    }

    return( 
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <View style={styles.stopwatch}>
                    <Ionicons name='time' size={30} color={"#000"}/>
                    {Show()}
                </View>
                <View style={{width:'100%', alignItems:'center', zIndex:0}}>
                    <Text>{title}</Text>
                </View>
            </View>
        </View>
    )
};

export default forwardRef(ExamTopBar)

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
    },
    timerStyle:{

    },
    stopwatch:{
        position:'absolute', 
        marginLeft:10, 
        zIndex:1,
        flexDirection:'row'
    }
})