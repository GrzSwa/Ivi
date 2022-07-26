import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Button } from '../components/Button';

export const Beginning = ({ item, onPress, style }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={style}>
			<View style={beginningStyle.exam}>
                <Text style={{fontSize:50, color:"#fff"}} >{item.key}</Text>
			</View>

			<View style={beginningStyle.examDescriptions}>
				<Text>Kliknij aby rozpocząć test</Text>
			</View>
		</View>
	</TouchableOpacity>
  );

export const Tried = ({ item, onPress, style }) => (
		<View style={style}>
			<View style={triedStyle.exam}>
                <Text style={{fontSize:50, color:"#fff"}}>{item.key}</Text>
			</View>

            <View style={triedStyle.lastTry}>
                <View style={triedStyle.first}>
                    <Text style={{fontSize:27, color:'#50FF70', 
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 2,
                    textShadowColor: 'black',
                    fontWeight:'bold',color: item.result < 50 ? 'red' : 'gold'}}>{item.result}%</Text>
                </View>
                <View style={triedStyle.second}>
                    <Text style={{fontSize:10,}}>Ostatnia próba - {item.lastResult}%</Text>
                </View>
			</View>

			<View style={triedStyle.btn}>
				<Button 
                    title='Rozwiąż jeszcze raz' 
                    onPress={onPress}
                    backgroundColor={'#2F3A8F'}
                    borderRadius={25}
                    fontSize={9}
                    fontColor={'#fff'}
                    width={'90%'}
                    height={20}
                />
			</View>
		</View>
  ); 

export const Completed = ({ item, onPress, style }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={style}>
			<View style={completedStyle.examDescriptions}>
                <Text style={{
                    fontSize:40, color:'#50FF70', 
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 2,
                    textShadowColor: 'black',
                    fontWeight:'bold'}}
                >
                    {item.result}%
                </Text>
			</View>
			<View style={completedStyle.exam}>
                <Text style={{fontSize:50, color:"#fff"}} >{item.key}</Text>
			</View>
		</View>
	</TouchableOpacity>
  );
 

const beginningStyle = StyleSheet.create({    
  
    exam: {
        backgroundColor: '#2F3A8F',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        flex:1,
        borderRadius:25,
    },
  
    examDescriptions: {
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        flex:2
    },
});

const triedStyle = StyleSheet.create({    
  
      lastTry: {
          alignItems:'center',
          justifyContent:'flex-end',
          height:'85%',
          flex:1,
      },

      first:{
        width:'100%',
        padding:10,
        alignItems:'center',
      },

      second:{
        width:'100%',
        padding:5,
        alignItems:'center',
      },
  
      exam: {
        backgroundColor: '#2F3A8F',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        flex:1,
        borderRadius:25,
    },
  
      btn: {
          height:'85%',
          flex:1,
          justifyContent:'center'
      },
});  

const completedStyle = StyleSheet.create({    
  
    exam: {
        backgroundColor: '#2F3A8F',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        flex:1,
        borderRadius:25,
    },
  
    examDescriptions: {
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        flex:2
    },
});