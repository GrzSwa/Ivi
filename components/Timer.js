import { View, Text } from 'react-native'
import { useState, useEffect, useRef } from 'react'

const Timer = ({backGroundStyle, timerStyle, start, serparator, hour, minute, seconds, miliseconds}) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(start);  
    const timerRef = useRef(0);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else 
            clearInterval(timerRef.current);

        return () => clearInterval(timerRef.current);
    }, [running]);

    const showHour = () => (
        <Text style={timerStyle}>
            {Math.floor((time/3600000) % 60) < 10 ? "0" + Math.floor((time/3600000) % 60) : Math.floor((time/3600000) % 60)}
            {serparator ? serparator : ":"}
        </Text>
    );

    const showMinute = () => (
        <Text style={timerStyle}>
            {Math.floor((time/60000) % 60) < 10 ? "0" + Math.floor((time/60000) % 60) : Math.floor((time/60000) % 60)}
            {serparator ? serparator : ":"}
        </Text>
    );

    const showSecond = () => (
        <Text style={timerStyle}>
            {Math.floor((time/1000) % 60) < 10 ? "0" + Math.floor((time/1000) % 60) : Math.floor((time/1000) % 60)}
            {serparator ? serparator : ":"}
        </Text>
    );

    const showMiliseconds = () => (
        <Text style={timerStyle}>
            {Math.floor((time/10) % 100) < 10 ? "0" + Math.floor((time/10) % 100) : Math.floor((time/10) % 100)}
        </Text>
    );

    const Show = () =>{
        //Pokombinować z tablicą
        if(hour && minute && seconds && miliseconds)
        return(
            <View style={[{flexDirection:'row', backgroundColor:'gold'},backGroundStyle]}>
                {showHour()}
                {showMinute()}
                {showSecond()}
                {showMiliseconds()}
            </View>
        )
    }


    return (
        <View>
            {Show()}
        </View>
    )
}

export default Timer