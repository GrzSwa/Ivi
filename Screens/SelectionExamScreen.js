import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Button} from 'react-native';
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
    {
        id: '58694a0f-3da1-471f-3ad53abb28ba-471f',
        title: 'Test4',
        status: 2,
      },
  ];

const Beginning = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={styles.examListStyleContainer}>
			<View style={styles.exam}>
                <Text>{item.title}</Text>
			</View>

			<View style={styles.examDescriptions}>
				<Text>Kliknij aby rozpocząć test</Text>
			</View>
		</View>
	</TouchableOpacity>
  );

const Tried = ({ item, onPress }) => (
		<View style={styles.examListStyleContainer}>
			<View style={styles.exam}>
                <Text>{item.title}</Text>
			</View>

            <View style={styles.lastTry}>
                <Text>75%</Text>
                <Text>Ostatnia próba - 50%</Text>
			</View>

			<View style={styles.btn}>
				<Button title='Rozwiąż jeszcze raz' onPress={onPress}/>
			</View>
		</View>
  ); 

const Completed = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={styles.examListStyleContainer}>
			<View style={{backgroundColor: 'darksalmon', alignItems:'center', width:'85%'}}>
                <Text>100%</Text>
			</View>
			<View style={{backgroundColor: 'bisque',justifyContent:'center',alignItems:'center',width:'15%'}}>
                <Text>{item.title}</Text>
			</View>
		</View>
	</TouchableOpacity>
  );



export default function SelectionExamScreen() {
	
	const [selectedId, setSelectedId] = useState(null);
	const renderItem = ({ item }) => {
        if(item.status == 0){
            return (
                <Beginning
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                />
            );
        }else if(item.status == 1){
            return (
                <Tried
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                />
            );
        }else{
            return (
                <Completed
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                />
            ); 
        }
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
    examListStyleContainer: {
        backgroundColor: 'lightgray',
        marginVertical: 8,
        width:'100%',
        flexDirection:'row'
    },
    
    rightContent: {
      backgroundColor: 'aquamarine',
      width:'100%',
    },

    lastTry: {
        backgroundColor: 'aquamarine',
        alignItems:'center',
    },
  
    title: {
      backgroundColor: 'bisque',
      width:'100%',
    },

    exam: {
        backgroundColor: 'bisque',
        justifyContent:'center',
        alignItems:'center',
    },

    btn: {
        backgroundColor: 'darksalmon',
    },
    descriptions: {
      backgroundColor: 'darksalmon',
      width:'100%',
    },

    examDescriptions: {
        backgroundColor: 'darksalmon',
        alignItems:'center',
        width:'100%',
    },
  });