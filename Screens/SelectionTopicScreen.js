import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
//import { db } from '../FirebaseConfig';
// import { ref, onValue } from "firebase/database";
import { getTopic } from '../MyModule/Database';
import { getAuth } from 'firebase/auth';

export default function HomeScreen({navigation, route}) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true)
	const [selectedId, setSelectedId] = useState(null);

	useEffect(()=>{
		setData(getTopic(getAuth().currentUser.email));
		setLoading(false);
	},[]);

	

	const renderItem = ({ item }) =>(
		<TouchableOpacity onPress={()=>{navigation.navigate("Topic",{id:item.key})}}>
			<View style={styles.listStyleContainer}>
				<View style={styles.picture}>
					<Text>IMG</Text>
				</View>
				<View style={styles.rightContent}>
					<View style={styles.title}>
						<Text>{item.desc.Tytul}</Text>
					</View>
					<View style={styles.descriptions}>
						<Text>{item.desc.Opis}</Text>
					</View>
					<View style={styles.progress}>
						<ProgressBar progress={item.progress/100} color={'lime'}/>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
if(!loading){
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.listSpace}>
				<FlatList 
					style={{width:'100%'}}
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => {item.key}}
					extraData={selectedId}
				/>
			<Button onPress={()=>{console.log(data)}}>Show DB</Button>
			</View>
		</SafeAreaView>
	);
}else{
	return(
		<SafeAreaView style={styles.container}>
				<View style={styles.listSpace}>
					<ActivityIndicator size="small" color="#0000ff" />
				</View>
		</SafeAreaView>
	)
}
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'flex-start',
	backgroundColor:'dodgerblue',
	paddingTop:30,
  },

  listSpace: {
	backgroundColor: '#fff',
	alignItems: 'center',
	width:'80%',
  },

  listStyleContainer: {
	backgroundColor: 'lightgray',
	marginVertical: 8,
	width:'100%',
	flexDirection:'row'
  },
  picture: {
	backgroundColor: 'pink',
  },
  
  rightContent: {
	backgroundColor: 'aquamarine',
	width:'100%',
  },

  title: {
	backgroundColor: 'bisque',
	width:'100%',
  },

  descriptions: {
	backgroundColor: 'darksalmon',
	width:'100%',
  },

  progress: {
	backgroundColor: 'indianred',
	width:'100%',
	height:20, //wersja robocza, zmienić!
  },
});
