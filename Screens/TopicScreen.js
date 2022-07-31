import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, StatusBar, Dimensions} from 'react-native';
import { LessonBox } from '../components/LessonBox';
import { TopicTopBar } from '../components/TopicTopBar';
import { ProgressBar } from '../components/ProgressBar';

const WIDTH = Dimensions.get("screen").width;

export default function TopicScreen({navigation, route}) {
	var calc = 100/route.params.data.rules.length;

	const [changer, setChanger] = useState(()=>{
		if(route.params.data.progress / calc  == 0)
			return 0
		else
			return route.params.data.progress / calc - 1
	})

	const [progress, setProgress] = useState(()=>{
		if(route.params.data.progress == 0)
			return 25
		else
			return route.params.data.progress
	});

	const [txt, setTxt] = useState('');
	const [showTxt, setShowTxt] = useState(20);

	function progressEffect(){
		if(changer == route.params.data.rules.length - 1)
			{ 
				setChanger(0);
				setTxt('Pora na Przykłady');
				setShowTxt(50)	 
			}else {
				setChanger(changer + 1)
				setProgress(progress + calc);
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
				<Button title='klik' onPress={progressEffect}/>
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
  });