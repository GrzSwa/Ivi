import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Loading } from '../components/Loading';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { ProgressBar } from '../components/ProgressBar';

export default function HomeScreen({navigation, route}) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true)
	const auth = getAuth();

	function getTopic(){
		const readData = ref(db,'/');
			onValue(readData, (snapshot)=>{
				var arr = [];
				var topic = snapshot.val()["Tematy"];
				var account = snapshot.val()["Konta"];
				for(let i in account){
					if(auth.currentUser.email.toLowerCase() == account[i].Email.toLowerCase()){
						for(let j in topic){
							if(account[i].PostepTematow[j].Pisownia.toLowerCase() == topic[j].Pisownia.toLowerCase()){
								arr.push({
									key: topic[j].Pisownia,
									progress: account[i].PostepTematow[j].Postep,
									desc: topic[j].OpisTematu,
									example: topic[j].Przyklady,
									rules: topic[j].Zasady
								})
							}
						}
					}	
				}
				setData(arr);
				setLoading(false);
			})    
	}

	useEffect(()=>{
		getTopic();
	},[])


	const renderItem = ({ item }) =>(
		<TouchableOpacity onPress={()=>{navigation.navigate("Topic",{data:item})}}>
			<View style={styles.listStyleContainer}>
				<View style={styles.picture}>
					<Text>IMG</Text>
				</View>
				<View style={styles.rightContent}>
					<View style={styles.title}>
						<Text style={{fontWeight: 'bold', fontSize:14}}>{item.desc.Tytul}</Text>
					</View>
					<View style={styles.descriptions}>  
						<Text style={{fontSize:12}}>{item.desc.Opis}</Text>
					</View>
					<View style={styles.progress}>
						<ProgressBar 
							width={120}
							height={10}
							firstColor={'#FE7E6D'}
							secondColor={'#2F3A8F'}
							progress={item.progress}
							radius={20}
							showValue={true}
						/>
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
	backgroundColor:'#FEECE9',
	paddingTop:30,
  },

  listSpace: {
	width:'90%',
  },

  listStyleContainer: {
	backgroundColor:'#CCD1E4',
	marginVertical: 8,
	width:'100%',
	height:120,
	flexDirection:'row',
	padding:20,
	borderRadius:25,
  },
  picture: {
	backgroundColor:'#2F3A8F',
	padding:10,
	marginTop:10,
	marginLeft:-5,
	marginRight:5,
	height:'80%',
	borderRadius:20,
	justifyContent:'center'
  },
  
  rightContent: {
	width:'100%',
	paddingLeft:5
  },

  title: {
	width:'100%',
  },

  descriptions: {
	width:'90%',
  },

  progress: {
	flexDirection:'row',
	//width:'50%',
	height:20,
	paddingTop:5,
	alignItems:'center'
  },
});
