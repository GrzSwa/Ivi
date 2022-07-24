import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Button} from 'react-native';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { Loading } from '../components/Loading';

const Beginning = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={styles.examListStyleContainer}>
			<View style={styles.exam}>
                <Text>{item.key}</Text>
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
                <Text>{item.key}</Text>
			</View>

            <View style={styles.lastTry}>
                <Text>{item.result}%</Text>
                <Text>Ostatnia próba - {item.lastResult}</Text>
			</View>

			<View style={styles.btn}>
				<Text>Rozwiąż jeszcze raz</Text>
			</View>
		</View>
  ); 

const Completed = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} >
		<View style={styles.examListStyleContainer}>
			<View style={{backgroundColor: 'darksalmon', alignItems:'center', width:'85%'}}>
                <Text>{item.result}%</Text>
			</View>
			<View style={{backgroundColor: 'bisque',justifyContent:'center',alignItems:'center',width:'15%'}}>
                <Text>{item.key}</Text>
			</View>
		</View>
	</TouchableOpacity>
  );

export default function SelectionExamScreen() {
	
  function getExam(){
		const readData = ref(db,'/Konta');
			onValue(readData, (snapshot)=>{
				var arr = [];
				var idU = 0;
				var exam = snapshot.val();
				for(let i in exam){
					if(exam[i].Email == auth.currentUser.email){
						idU = i;
						break;
					}
				}
				for(let j in exam[idU].PostepTematow){
					arr.push({
						key:exam[idU].PostepTematow[j].Pisownia,
						result: exam[idU].PostepTematow[j].wynik,
						lastResult: exam[idU].PostepTematow[j].OstatniaProba,
						atempt: exam[idU].PostepTematow[j].IloscProb
					});
				}
				setData(arr);
				setLoading(false)
			})    
	}

	useEffect(()=>{
		getExam();
	},[])

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const auth = getAuth();
  
	const renderItem = ({ item }) => {
        if(item.atempt == 0 ){
            return (
                <Beginning
                    item={item}
                />
            );
        }if(item.atempt > 0 && item.result < 100){
            return (
                <Tried
                    item={item}
                />
            );
        }if(item.result == 100){
            return (
                <Completed
                    item={item}
                />
            ); 
        }
	};
	if(!loading)
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
	else
		return(
			<Loading />
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