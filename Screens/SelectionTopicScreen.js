import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";


export default function HomeScreen({navigation, route}) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true)
	const [selectedId, setSelectedId] = useState(null);

	function readData(){
		const read = ref(db,'/');
		onValue(read, (snapshot) => {
			var arr = [];
			snapshot.forEach((res)=>{
				arr.push({
					key:res.val().Pisownia,
					data: res.val()
				})
			})
			setData(arr);
			setLoading(false);
		});
	}

	useEffect(()=>{
		readData();
	},[]);

	const renderItem = ({ item }) =>(
		<TouchableOpacity onPress={()=>{setSelectedId(item.key); console.log(selectedId)}}>
			<View style={styles.listStyleContainer}>
				<View style={styles.picture}>
					<Text>IMG</Text>
				</View>
				<View style={styles.rightContent}>
					<View style={styles.title}>
						<Text>{item.data.OpisTematu.Tytul}</Text>
					</View>
					<View style={styles.descriptions}>
						<Text>{item.data.OpisTematu.Opis}</Text>
					</View>
					<View style={styles.progress}>
						<ProgressBar progress={0.5} color={'lime'}/>
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
