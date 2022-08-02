import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { ExamTopBar } from '../components/ExamTopBar';

export default function ExamScreen({navigation, route}) {
	return (
	    <SafeAreaView style={styles.container}>
			<ExamTopBar title={'Exam'} onPress={()=>{navigation.goBack()}}/>
            <View>
                <Text>{route.params.id}</Text>
            </View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });