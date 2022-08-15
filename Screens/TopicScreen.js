import { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import { LessonBox } from '../components/LessonBox';
import { TopicTopBar } from '../components/TopicTopBar';
import { ProgressBar } from '../components/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { update } from 'firebase/database';

const WIDTH = Dimensions.get("screen").width;

export default function TopicScreen({navigation, route}) {

	var calc = 100/route.params.data.rules.length;
	const [changer, setChanger] = useState(()=>{if(route.params.data.progress/calc==0)return 0;else return route.params.data.progress/calc-1;})
	const [progress, setProgress] = useState(()=>{if(route.params.data.progress == 0)return 25; else return route.params.data.progress;});
	const [txt, setTxt] = useState('');
	const [showTxt, setShowTxt] = useState(20);

	useEffect(()=>{
		update(route.params.db,{Postep:progress})
	},[progress])

	async function redo(){
		if(changer != route.params.data.rules.length - 1){
				setChanger((current) => current + 1)
				setProgress((current) => current  + calc);
				
			}			
	}

	async function undo(){
		if(changer == 0){ 
			setChanger(0); 
		}else {
			setChanger((current) => current - 1);
			setProgress((current) => current - calc);
		}			
	}
		return (
			<SafeAreaView style={styles.container}>
				<TopicTopBar title={route.params.data.key} onPress={()=>{navigation.goBack()}}/>
				<View style={{marginTop:-46}}>
					<ProgressBar 
						width={WIDTH}
						height={showTxt}
						radiusBottom={20}
						secondColor={'#FEECE9'}
						firstColor={'#2F3A8F'}
						progress={progress}
						valueInside={true}
						showValue={true}
						text={txt}
						fontColor={'#fff'}
						fontSize={16}
					/>
				</View>
				<View style={{marginTop:35}}>
					<LessonBox 
						rules={route.params.data.rules}
						example={route.params.data.example}
						i={changer}
					/>
				</View>

				<View style={styles.actionBtn}>
					<TouchableOpacity onPress={undo}>
						<Ionicons name='ios-arrow-undo-circle-sharp' size={60} color={"#2F3A8F"}/>
					</TouchableOpacity>

					<TouchableOpacity onPress={redo}>
						<Ionicons name='ios-arrow-redo-circle-sharp' size={60} color={"#2F3A8F"}/>
					</TouchableOpacity>
				</View>
				
			</SafeAreaView>
		);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#FEECE9',
    },

	actionBtn:{
		width:'90%',
		marginTop:25,
		height:90,
		flexDirection:'row',
		justifyContent:'space-evenly',
		alignItems:'center'
	}
  });