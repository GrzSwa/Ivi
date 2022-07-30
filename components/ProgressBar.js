import {Text, View} from 'react-native';

function check(show, progress){
    if(show === true){
        return(
            <View>
                <Text style={{marginTop:-2, marginLeft: 4}}>{progress+'%'}</Text>
            </View>
        )
    }
}

export const ProgressBar = ({width = 100, height, firstColor, secondColor, progress, radiusBottom, radius, showValue})=> (
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
                width: progress !== undefined ? String(progress)+'%' : 100,
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
);
