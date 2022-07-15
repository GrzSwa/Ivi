import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";


const DATA = [
	{
	  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
	  title: 'First Item',
	},
	{
	  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
	  title: 'Second Item',
	},
	{
	  id: '58694a0f-3da1-471f-bd96-145571e29d72',
	  title: 'Third Item',
	},
  ];


function readData(){	
	const read = ref(db, '/');
	onValue(read, (snapshot) => {
		const data = snapshot.val();
		var result = data.map((item)=>{
			return{
				key: item.Pisownia,
				opis: item.OpisTematu,
				zasady: item.Zasady
			};
		})
		//return (result)
		console.log(result[0].key);
	});
}


const Item = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={styles.listStyleContainer}>
			<View style={styles.picture}>
				<Text>IMG</Text>
			</View>
			<View style={styles.rightContent}>
				<View style={styles.title}>
					<Text>{item.opis.Tytul}</Text>
				</View>
				<View style={styles.descriptions}>
					<Text>descriptions</Text>
				</View>
				<View style={styles.progress}>
					<ProgressBar progress={0.5} color={'lime'}/>
				</View>
			</View>
		</View>
	</TouchableOpacity>
  );

export default function HomeScreen({navigation, route}) {
	
	const [selectedId, setSelectedId] = useState(null);

	const renderItem = ({ item }) => {
		return (
		  <Item
			item={item}
			onPress={() => setSelectedId(item.key)}
		  />
		);
	};
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.listSpace}>
					<FlatList
						style={{width:'100%'}}
						data={readData}
						renderItem={renderItem}
						keyExtractor={(item) => item[0].key} // Zrobić statycznie taki plik json zamiast tablicy DATA u góry i sprawdzić
						extraData={selectedId}
					/>
					<Button onPress={readData}>show DB</Button>
				</View>
			</SafeAreaView>
		);
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
