import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import ExamTopBar from '../components/ExamTopBar';

export default function ExamScreen({navigation, route}) {
	const childRef = useRef();
	const [TimeFromExamTopBar, setTimeFromExamTopBar] = useState();
	
	const getTimeFromExamTopBar = (time) =>{
		setTimeFromExamTopBar(time);
	}
	return (
	    <SafeAreaView style={styles.container}>
			<ExamTopBar 
				title={'Exam'} 
				onPress={()=>{navigation.goBack()}} 
				sendTimeToParent={getTimeFromExamTopBar}
				ref={childRef}
			/>
            <View style={{width:'100%'}}>
				<Button title='klik' onPress={()=>{childRef.current.stopTimer()}}/>
            </View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });