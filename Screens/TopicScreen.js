import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, StatusBar, Dimensions} from 'react-native';
import { LessonBox } from '../components/LessonBox';
import { TopicTopBar } from '../components/TopicTopBar';
import { ProgressBar } from '../components/ProgressBar';

const WIDTH = Dimensions.get("screen").width;

export default function TopicScreen({navigation, route}) {
	var calc = 100/route.params.data.rules.length;
	const [changer, setChanger] = useState(0)
	const [progress, setProgress] = useState(100/route.params.data.rules.length);
	console.log(calc);
	console.log(calc)
	function progressEffect(){
		if(changer == route.params.data.rules.length - 1)
			{ 
				setChanger(0);
				setProgress(100/route.params.data.rules.length);	 
			}else {
				setChanger(changer + 1)
				setProgress(progress + (100/route.params.data.rules.length))
			}			
	}
	return (
	    <SafeAreaView style={styles.container}>
			<TopicTopBar title={route.params.data.key}/>
			<View style={{marginTop:-46}}>
				<ProgressBar 
					width={WIDTH}
					height={30}
					radiusBottom={20}
					secondColor={'#FEECE9'}
					firstColor={'#2F3A8F'}
					progress={progress}
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