import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import { getAuth} from 'firebase/auth';

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

const Item = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<Text>{item.title}</Text>
	</TouchableOpacity>
  );

export default function HomeScreen({navigation, route}) {
	
	const auth = getAuth();
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
				<View>
				<FlatList
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
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor:'dodgerblue',
	
  },
});
