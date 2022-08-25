import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { SelectionTopicScreenStyle } from '../Style';
import { Loading } from '../components/Loading';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { ProgressBar } from '../components/ProgressBar';

export default function HomeScreen({navigation, route}) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [idUser, setIduser] = useState(undefined);
	const [idTopic, setIdTopic]= useState([]);
	const auth = getAuth();

	function getTopic(){
		const readData = ref(db,'/');
			onValue(readData, (snapshot)=>{
				if(auth.currentUser == null)
					return setLoading(true)
				else{
				var arr = [];
				var topic = snapshot.val()["Tematy"];
				var account = snapshot.val()["Konta"];
				for(let i in account){
					if(auth.currentUser.email.toLowerCase() == account[i].Email.toLowerCase()){
						setIduser(i);
						for(let j in topic){
							if(account[i].PostepTematow[j].Pisownia.toLowerCase() == topic[j].Pisownia.toLowerCase()){
								setIdTopic(e => [...new Set([...e,topic[j].Pisownia])])
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
			}})   
	}

	useEffect(()=>{
		getTopic();
	},[])
	
	const renderItem = ({ item }) =>(

		<TouchableOpacity key={item.key}onPress={()=>{navigation.navigate("Topic",{data:item, db:ref(db,'/Konta/'+idUser+'/PostepTematow/'+idTopic.indexOf(item.key))})}}>
			<View style={SelectionTopicScreenStyle.listStyleContainer}>
				<View style={SelectionTopicScreenStyle.picture}>
					<Text style={{color:'white',fontSize:22}}>{item.key.replace("Pisownia","")}</Text>
				</View>
				<View style={SelectionTopicScreenStyle.rightContent}>
					<View style={SelectionTopicScreenStyle.title}>
						<Text style={{fontWeight: 'bold', fontSize:14}}>{item.desc.Tytul}</Text>
					</View>
					<View style={SelectionTopicScreenStyle.descriptions}>  
						<Text style={{fontSize:12}}>{item.desc.Opis}</Text>
					</View>
					<View style={SelectionTopicScreenStyle.progress}>
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
		<SafeAreaView style={SelectionTopicScreenStyle.container}>
			<View style={SelectionTopicScreenStyle.listSpace}>
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

/*const Styles = StyleSheet.create({
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
});*/
