import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { Loading } from '../components/Loading';
import { db } from '../FirebaseConfig';
import { ref, onValue, set } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { getTopic } from '../MyModule/Database';

export default function HomeScreen({navigation, route}) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const auth = getAuth();

	function getTopic(){
		const readData = ref(db,'/');
			onValue(readData, (snapshot)=>{
				var arr = [];
				var topic = snapshot.val()["Tematy"];
				var account = snapshot.val()["Konta"];
				for(let i in account){
					if(auth.currentUser.email == account[i].Email){
						for(let j in topic){
							if(account[i].PostepTematow[j].Pisownia == topic[j].Pisownia){
								arr.push({
									key: topic[j].Pisownia,
									progress: account[i].PostepTematow[j].Postep,
									desc: topic[j].OpisTematu,
									example: topic[j].Przyklady,
									rules: topic[j].Zasady
								})
							}
						}
					}else
						console.log("Warning");
				}
				setData(arr);
				setLoading(false);
			})    
	}

	useEffect(()=>{
		getTopic();
	},[])


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
				/>
			<Button onPress={()=>{console.log(getTopic())}}>Show DB</Button>
			</View>
		</SafeAreaView>
	);
}else{
	return(
		<Loading />
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
