import {Text, View, Animated} from 'react-native';
import { useRef, useState, useEffect } from 'react';



export function ProgressBar({width, height, firstColor, secondColor, progress, radiusBottom, radius, showValue, fontColor, valueInside, text, valueSuffix, fontSize}){
    const [prog, setProg] = useState(0);

    useEffect(()=>{
        for (let i = prog; i <= progress; i++) {
            setTimeout(() => {
                setProg(i);
            }, 5 * i);
        }
    },[progress])

    function check(){
        if(showValue && !valueInside){
            return(
                <View>
                    <Text style={{marginTop:-2, marginLeft: 4,}}>{progress+'%'}</Text>
                </View>
            )
        }else{
            return(
                <View style={{alignItems:'center', paddingTop:22}}>
                    <Text style={
                        { 
                            marginLeft: -width, 
                            fontSize:fontSize,
                            color:fontColor
                        }
                    }>
                        {text}{valueSuffix}
                    </Text>
                </View>
            )
        }
    }
    return(
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{
                width:width,
                height:height,
                backgroundColor:secondColor,
                borderRadius:radius,
                borderBottomLeftRadius: radiusBottom,
                borderBottomRightRadius: radiusBottom,
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
                {check()}
        </View>
)
};
