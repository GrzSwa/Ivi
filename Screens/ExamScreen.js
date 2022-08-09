import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Ionicons } from '@expo/vector-icons';
import ExamTopBar from '../components/ExamTopBar';
import { db } from '../FirebaseConfig';
import { ref, onValue, set } from "firebase/database";
import * as Speech from 'expo-speech';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ExamScreen({navigation, route}) {
	const childRef = useRef();
	const [TimeFromExamTopBar, setTimeFromExamTopBar] = useState();
	const [questionsAmount, setQuestionsAmount] = useState(0);
	const [category, setCategory] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [answer, setAnswer] = useState([]);
	const [arrToCollectUniqueRandomValue, setArrToCollectUniqueRandomValue] = useState([0]);
	const [changeText, setChangeText] = useState(null);
	const [result, setResult] = useState([]);
	const [renderCheckAnswer, setRenderCheckAnswer] = useState(false);

	const getTimeFromExamTopBar = (time) =>{
		setTimeFromExamTopBar(time);
	}

	const speak = (text) => {
		const whatSpeak = text;
		Speech.speak(whatSpeak,{rate:0.8});
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
				if(data[idE].Pytania[i].Typ == 'PF'){
					arr.push( 
						{
							category: "TrueFalse",
							questions: data[idE].Pytania[i].Pytanie,
							correctAnswer: data[idE].Pytania[i].PoprawnaOdp
						}
					)
				}
				if(data[idE].Pytania[i].Typ == 'Wyboru'){
					arr.push(
						{
							category: "choice",
							questions: data[idE].Pytania[i].Pytanie,
							answer: data[idE].Pytania[i].Odpowiedzi,
							correctAnswer: data[idE].Pytania[i].Odpowiedzi[data[idE].Pytania[i].PoprawnaOdp]
						}
					)
				}
				if(data[idE].Pytania[i].Typ == 'Czytane'){
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

	const generateRandomQuestions = () =>{
		if(arrToCollectUniqueRandomValue.length == questionsAmount){
			childRef.current.stopTimer();
			return -1;
		}
		else{
			var conditions = true
			var rand = 0
			while(conditions){
				rand = Math.floor(Math.random() * questionsAmount);
				conditions = arrToCollectUniqueRandomValue.includes(rand)
			}
			setArrToCollectUniqueRandomValue(prevElement => [...prevElement, rand]);
			return rand
		}
	}

	const addAnswer = (id, value) =>{
		let oldArr = [...answer];
		let flag = false;
		if(!oldArr.length)
			setAnswer([{idQuestions:id, answer: value}])
		else
			for(let i of oldArr){
				if(i.idQuestions === id){
					i.answer = value;
					setAnswer(oldArr);
					flag = true;
					break;
				}else{
					continue;
				}
			}
		if(!flag) 
			setAnswer([...oldArr, {idQuestions:id, answer: value}]);
	}

	const checkAnswer = () =>{
		let mistake = [];
		let trueFalseCorrect = 0;
		let trueFalseCount = 0;
		let choiceCorrect = 0;
		let choiceCount = 0;
		let readingCorrect = 0;
		let readingCount = 0;
		for(let i of answer){
			if(questions[i.idQuestions].category == 'reading')
				{
					readingCount++;
					i.answer == questions[i.idQuestions].questions 
						? readingCorrect++
						: mistake.push({correctAnswer:questions[i.idQuestions].questions, urAnswer: i.answer})
				}
			else if(questions[i.idQuestions].category == 'choice')
				{
					choiceCount++;
					i.answer == questions[i.idQuestions].correctAnswer
						? choiceCorrect++
						: mistake.push({correctAnswer:questions[i.idQuestions].correctAnswer, urAnswer: i.answer})
				}
			else
				{
					trueFalseCount++;
					i.answer == questions[i.idQuestions].correctAnswer
						? trueFalseCorrect++
						: mistake.push({correctAnswer:questions[i.idQuestions].correctAnswer, urAnswer: i.answer})
				}
		}
		mistake.push({
			allQueTrueFalse: trueFalseCount,
			allQueChoice: choiceCount,
			allQueReading: readingCount,
			trueFalseCorrect: trueFalseCorrect,
			choiceCorrect: choiceCorrect,
			readingCorrect: readingCorrect
		});
		setResult(mistake);
		setRenderCheckAnswer(true);
	}

	const renderAnswerBox = (idQuestions) =>{
		if(idQuestions === -1){
			if(!result.length){
				setTimeout(()=>{checkAnswer()},3000)
				return(<Loading />)
			}
			else
			return(
				<View style={styles.BoxContainer}>
					<View style={[styles.questionsBox, {alignItems:'center', justifyContent:'space-around' ,flexDirection:'row'}]}>
						<View>
							<Text>Pytania Tak/nie - {result[result.length-1].trueFalseCorrect+'/'+result[result.length-1].allQueTrueFalse}</Text>
							<Text>Pytania Wyboru - {result[result.length-1].choiceCorrect+'/'+result[result.length-1].allQueChoice}</Text>
							<Text>Dyktanda - {result[result.length-1].readingCorrect+'/'+result[result.length-1].allQueReading}</Text>
						</View>
						<View>
							<Text>asdasdsa</Text>
						</View>
					</View>
					<View style={styles.answerBox}>
						<Button title={'show Result'} onPress={()=>{console.log(result)}}/>
					</View>
				</View> 
			)
		}
			if(questions[idQuestions]?.category == 'TrueFalse'){
				return(
					<View style={styles.BoxContainer}>
						<View style={styles.questionsBox}>
							<Text>{questions[idQuestions]?.questions}</Text>
						</View>
						<View style={styles.answerBox}>
							<Button title={"Tak"} styles={styles.btn} fontStyle={styles.btnFont} onPress={()=>{addAnswer(idQuestions,true)}}/>
							<Button title={"Nie"} styles={styles.btn} fontStyle={styles.btnFont} onPress={()=>{addAnswer(idQuestions, false)}} />
						</View>
					</View> 
				)
			}
			if(questions[idQuestions]?.category == 'reading')
				return(
					<View style={styles.BoxContainer}>
						<View style={styles.questionsBox}>
							<Text style={{marginBottom:10}}>Kliknij aby odsłuchać tekst i zapisz go poniżej</Text>
							<Button title={<Ionicons name='megaphone-sharp' size={30} color={"#fff"}/>}
								backgroundColor={'#2F3A8F'}
								width={50}
								height={50}
								borderRadius={10}
								onPress={()=>{speak(questions[idQuestions].questions)}}
							/>
						</View>
						<View style={[styles.answerBox, {alignItems:'center', justifyContent:'flex-start', flexDirection:'column'}]}>
							<TextInput
								style={styles.input}
								multiline
								numberOfLines={4}
								placeholder="Tutaj wpisz usłyszny tekst"
								onChangeText={(value)=>{setChangeText(value)}}
							/>
							<Button 
								title={"Gotowe"} 
								backgroundColor={'#2F3A8F'}
								width={'40%'}
								height={'10%'}
								fontColor={'#fff'}
								onPress={()=>{addAnswer(idQuestions,changeText)}}
							/>
						</View>
							
					</View>
				)
			
			if(questions[idQuestions]?.category == 'choice'){
				return(
					<View style={styles.BoxContainer}>
						<View style={styles.questionsBox}>
							<Text>{questions[idQuestions]?.questions}</Text>
						</View>
						<View style={styles.answerBoxForChoice}>
							{questions[idQuestions]?.answer.map((item, index) =>{
								return(
								<View key={index}>
									<Button title={item} 
										styles={[styles.answerBoxForChoiceBtn]} 
										fontColor={'#fff'} 
										onPress={()=>{addAnswer(idQuestions,item)}}/>
								</View>
								)
							})}
						</View>
					</View>
				)
			}
	}

	

	useEffect(()=>{
		getQuestions();
	},[])
	return ( 
	    <SafeAreaView style={styles.container}>
			<ExamTopBar 
				title={route.params.id} 
				onPress={()=>{navigation.goBack()}} 
				sendTimeToParent={getTimeFromExamTopBar}
				ref={childRef}
			/>
			{renderAnswerBox(category)}
			<View style={styles.changeQuestionsBtn}>
				<Button 
					title={ category == -1 ? 'Powrót do testów' : 'Dalej' } 
					styles={ styles.changeQuestionsBtnStyle }  
					onPress={ category != -1 ? ()=>{setCategory(generateRandomQuestions())} : ()=> {navigation.goBack()} }
				/>
			</View> 
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    container: {
	  backgroundColor:'#FEECE9',
	  height:'100%'
    },

	questionsBox:{
		backgroundColor:'#CCD1E4',
		width:'100%',
		height:'35%',
		justifyContent:'center',
		alignItems:'center',
		borderBottomLeftRadius:25,
		borderBottomRightRadius:25
	},

	BoxContainer:{
		width:'100%',
		height:'80%',
		alignItems:'center',
		marginTop:-35,
	},

	answerBox:{
		width:'90%',
		height:'60%',
		margin:10,
		flexDirection:'row',
		justifyContent:'space-evenly',
		alignItems:'flex-end',
	},

	answerBoxForChoice:{
		width:'90%',
		height:'60%',
		margin:10,
		justifyContent:'space-evenly'
	},

	answerBoxForChoiceBtn:{
		backgroundColor:'#2F3A8F',
		padding:25
	},

	btn:{
		width:150, 
		height:70,
		margin:10,
		borderRadius:25,
		backgroundColor:'#2F3A8F'
	},

	btnFont:{
		fontSize:18,
		color:'#fff'
	},
	changeQuestionsBtn:{
		backgroundColor:'#FE7E6D',
		height:'5%',
		justifyContent:'space-around',
		flexDirection:'row',
		alignItems:'center',
		marginTop:15
	},
	changeQuestionsBtnStyle:{
		height:'100%',
		paddingLeft:20,
		paddingRight:20
	},

	input:{
		width:'100%',
		height:'50%',
		textAlignVertical: 'top',
		borderWidth:1,
		padding:5,
		marginBottom:10
	}
  });