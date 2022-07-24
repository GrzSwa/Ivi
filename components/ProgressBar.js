import {Text, View} from 'react-native';

export const ProgressBar = ({width, height, firstColor, secondColor, progress})=> (
	<View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{
            width:width,
            height:height,
            backgroundColor:secondColor,
            borderRadius:20,
        }}>
            <View style={{
                width: String(progress)+'%',
                height:10,
                backgroundColor:firstColor,
                borderRadius:20,
            }}>

            </View>
        </View>
        <View>
            <Text style={{marginTop:-2, marginLeft: 4}}>{progress}%</Text>
        </View>
    </View>
);
