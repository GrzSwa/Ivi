import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { Loading } from '../components/Loading';
import { Beginning, Tried, Completed } from '../components/ExamStatus';

export default function SelectionExamScreen({navigation}) {
	
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
						key:exam[idU].PostepTematow[j].Pisownia.replace("Pisownia",""),
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
                    style={styles.examListStyleContainer}
                    onPress={()=>{navigation.navigate("Exam",{id:item.key})}}
                />
            );
        }if(item.atempt > 0 && item.result < 100){
            return (
                <Tried
                    item={item}
                    style={styles.examListStyleContainer}
                    onPress={()=>{navigation.navigate("Exam",{id:item.key})}}
                />
            );
        }if(item.result == 100){
            return (
                <Completed
                    item={item}
                    style={styles.examListStyleContainer}
                    onPress={()=>{console.log("Jeszcze raz?")}}
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
      backgroundColor:'#FEECE9',
      paddingTop:30,
    },

    examListStyleContainer: {
        backgroundColor: '#CCD1E4',
        marginVertical: 8,
        width:'100%',
        flexDirection:'row',
        height:120,
        borderRadius:25,
        alignItems:'center',
    },
  
    listSpace: {
      alignItems: 'center',
      width:'90%',
    },
});
