import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import ExamTopBar from '../components/ExamTopBar';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";

export default function ExamScreen({navigation, route}) {
	const childRef = useRef();
	const [TimeFromExamTopBar, setTimeFromExamTopBar] = useState();
	const [questionsAmount, setQuestionsAmount] = useState(0);
	const [category, setCategory] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [arrToCollectUniqueRandomValue, setArrToCollectUniqueRandomValue] = useState([])

	//<Button title='klik' onPress={()=>{childRef.current.stopTimer()}}/>

	const getTimeFromExamTopBar = (time) =>{
		setTimeFromExamTopBar(time);
	}


	function getQuestions(){
		const readData = ref(db,'/Testy');
		onValue(readData, (snapshot)=>{
			let data = snapshot.val()
			let idE = 0;
			var arr = [];
			for(let i in data){
				if(data[i].Pisownia.toLowerCase().replace("pisownia","") == route.params.id.toLowerCase()){
					idE = i;
					setQuestionsAmount(data[i].Pytania.length);
					break;
				}
			}

			for(let i in data[idE].Pytania){
				if(!data[idE].Pytania[i].Czytane && !data[idE].Pytania[i].Wyboru){
					arr.push( 
						{
							category: "normal",
							questions: data[idE].Pytania[i].Pytanie
						}
					)
				}
				if(!data[idE].Pytania[i].Czytane && data[idE].Pytania[i].Wyboru){
					arr.push(
						{
							category: "choice",
							questions: data[idE].Pytania[i].Pytanie,
							answer: data[idE].Pytania[i].Odpowiedzi,
							correctAnswer: data[idE].Pytania[i].Odpowiedzi[data[idE].Pytania[i].PoprawnaOdp]
						}
					)
				}
				if(data[idE].Pytania[i].Czytane){
					arr.push(
						{
							category:"reading",
							questions: data[idE].Pytania[i].Pytanie 
						}
					)
				}
			}
			setQuestions(arr);
		})
	}

	useEffect(()=>{
		getQuestions();
	},[])

	const renderAnswerBox = (whatRender) =>{
		console.log(arrToCollectUniqueRandomValue)
		console.log(whatRender)
			if(questions[whatRender]?.category == 'normal'){
				return(
					<View style={styles.answerBoxContainer}>
						<View style={styles.questionsBox}>
							<Text>{questions[whatRender]?.questions.replace(/"([^"\\]|\\.)*"/gus,"_")}</Text>
						</View>
						<View style={styles.answerBox}>
							<Text>Normal</Text>
						</View>
					</View> 
				)
			}
			if(questions[whatRender]?.category == 'reading')
				return(
					<View style={styles.answerBoxContainer}>
						<View style={styles.questionsBox}>
							<Text>{questions[whatRender]?.questions}</Text>
						</View>
						<View style={styles.answerBox}>
							<Text>Read</Text>
						</View>
					</View>
				)
	}
	return ( 
	    <SafeAreaView style={styles.container}>
			<ExamTopBar 
				title={route.params.id} 
				onPress={()=>{navigation.goBack()}} 
				sendTimeToParent={getTimeFromExamTopBar}
				ref={childRef}
			/>
			{renderAnswerBox(category)}
			<Button title='klik' onPress={()=>{  }}/>  
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

	questionsBox:{
		backgroundColor:'#CCD1E4',
		flex:1,
		width:'100%',
		justifyContent:'center',
		alignItems:'center',
		marginTop:-35,
		borderBottomLeftRadius:25,
		borderBottomRightRadius:25
	},

	answerBoxContainer:{
		width:'100%',
		height:'50%', 
		alignItems:'center'
	},

	answerBox:{
		backgroundColor:'dodgerblue',
		width:'90%',
		flex:2.5,
		margin:10
	}
  });