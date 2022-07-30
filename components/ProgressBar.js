import {Text, View, Animated} from 'react-native';
import { useRef, useState, useEffect } from 'react';

function check(show, progress){
    if(show === true){
        return(
            <View>
                <Text style={{marginTop:-2, marginLeft: 4}}>{progress+'%'}</Text>
            </View>
        )
    }
}

export function ProgressBar({width = 100, height, firstColor, secondColor, progress, radiusBottom, radius, showValue}){
    const [prog, setProg] = useState(0);

    useEffect(()=>{
        for (let i = prog; i <= progress; i++) {
            setTimeout(() => {
                setProg(i);
            }, 5 * i);
        }
    },[progress])

    return(
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{
                width:width,
                height:height,
                backgroundColor:secondColor,
                borderRadius:radius,
                borderBottomLeftRadius: radiusBottom,
                borderBottomRightRadius: radiusBottom
            }}>
                <View style={{
                    width: progress !== undefined ? String(prog)+'%' : 100,
                    height:height,
                    backgroundColor:firstColor,
                    borderRadius:radius,
                    borderBottomLeftRadius: radiusBottom,
                    borderBottomRightRadius: radiusBottom
                }}>
                </View>
            </View>
                {check(showValue, progress)}
        </View>
)};
