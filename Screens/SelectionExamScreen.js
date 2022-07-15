import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { getAuth} from 'firebase/auth';

const DATA = [
	{
	  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
	  title: 'Test1',
      status: 0,
	},
	{
	  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
	  title: 'Test2',
      status: 1,
	},
	{
	  id: '58694a0f-3da1-471f-bd96-145571e29d72',
	  title: 'Test3',
      status: 2,
	},
  ];


const Item = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={styles.listStyleContainer}>
			<View style={styles.picture}>
				<Text>IMG</Text>
			</View>
			<View style={styles.rightContent}>
				<View style={styles.title}>
					<Text>{item.title}</Text>
				</View>
				<View style={styles.descriptions}>
					<Text>descriptions</Text>
				</View>
			</View>
		</View>
	</TouchableOpacity>
  );

export default function SelectionExamScreen() {
	
	const [selectedId, setSelectedId] = useState(null);
	const renderItem = ({ item }) => {
		return (
		  <Item
			item={item}
			onPress={() => setSelectedId(item.id)}
		  />
		);
	};
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.listSpace}>
					<FlatList
						style={{width:'100%'}}
						data={DATA}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						extraData={selectedId}
					/>
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