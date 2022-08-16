import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, BackHandler, Alert} from 'react-native';
import { Button, ButtonGroup } from '../components/Button';
import { Loading } from '../components/Loading';
import { Ionicons } from '@expo/vector-icons';
import ExamTopBar from '../components/ExamTopBar';
import { db } from '../FirebaseConfig';
import { ref, onValue, update } from "firebase/database";
import * as Speech from 'expo-speech';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function ExamScreen({navigation, route}) {
	const childRef = useRef();
	const [TimeFromExamTopBar, setTimeFromExamTopBar] = useState();
	const [questionsAmount, setQuestionsAmount] = useState(0);
	const [category, setCategory] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [answer, setAnswer] = useState([]);
	const [arrToCollectUniqueRandomValue, setArrToCollectUniqueRandomValue] = useState([0]);
	const [changeText, setChangeText] = useState(null);
	const [doneChangeText, setDoneChangeText] = useState(false)
	const [result, setResult] = useState([]);
	const [idExam, setIdExam] = useState(undefined);
	const [checkIfAnyAnswerHasBeenGiven, setCheckIfAnyAnswerHasBeenGiven] = useState(false);

	const getTimeFromExamTopBar = (time) =>{setTimeFromExamTopBar(time);}

	const speak = (text) => {
		const whatSpeak = text;
		Speech.speak(whatSpeak,{rate:0.9});
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
					setIdExam(i);
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
		setCheckIfAnyAnswerHasBeenGiven(true);
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

	const updateExamStatistic = (data) =>{
		const up0 = ref(db,'Konta/'+ data.user);
		const up1 = ref(db,'Konta/'+ data.user+'/PostepTematow/'+data.exam)
		let arr = {};
		let write = {};
		let tmp = {};
		onValue(up0,(snapshot)=>{
			arr["NajlepszyCzas"] = snapshot.val().NajlepszyCzas;
			arr["NajlepszyTemat"] = snapshot.val().NajlepszyTemat;
			arr["PostepTematow"] = [snapshot.val().PostepTematow[data.exam]]  
		})

		write["NajlepszyCzas"] = arr.NajlepszyCzas == '-' || arr.NajlepszyCzas < data.time 
									? data.time
									: arr.NajlepszyCzas;

		write["NajlepszyTemat"] = arr.NajlepszyTemat == '-'|| arr.PostepTematow[0].wynik < (Math.ceil(data.correct/data.allQuestions * 100)) 
									? arr.PostepTematow[0].Pisownia.toLowerCase().replace("pisownia","")
									: arr.NajlepszyTemat

		tmp["Bledy"] = arr.PostepTematow[0].Bledy == 0 || arr.PostepTematow[0].Bledy < data.allQuestions - data.correct
						? data.allQuestions - data.correct
						: arr.PostepTematow[0].Bledy 

		tmp["OstatniaProba"] = arr.PostepTematow[0].wynik > (Math.ceil(data.correct/data.allQuestions * 100)) 
								? (Math.ceil(data.correct/data.allQuestions * 100)) 
								: arr.PostepTematow[0].OstatniaProba
		
		tmp["wynik"] = arr.PostepTematow[0].wynik < (Math.ceil(data.correct/data.allQuestions * 100))
								? (Math.ceil(data.correct/data.allQuestions * 100))
								: arr.PostepTematow[0].wynik

		tmp["IloscProb"] = arr.PostepTematow[0].IloscProb + 1
		write["PostepTematow"] = [tmp]

		//console.log(write)
		update(up0,{NajlepszyCzas: write.NajlepszyCzas, NajlepszyTemat: write.NajlepszyTemat})
		update(up1,
			{
				wynik:write.PostepTematow[0].wynik, 
				IloscProb: write.PostepTematow[0].IloscProb, 
				Bledy: write.PostepTematow[0].Bledy,
				OstatniaProba: write.PostepTematow[0].OstatniaProba 
			}
		)
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
							: mistake.push({questions:questions[i.idQuestions].questions, urAnswer: i.answer})
					}
				else if(questions[i.idQuestions].category == 'choice')
					{
						choiceCount++;
						i.answer == questions[i.idQuestions].correctAnswer
							? choiceCorrect++
							: mistake.push({questions:questions[i.idQuestions].questions, correctAnswer:questions[i.idQuestions].correctAnswer, urAnswer: i.answer})
					}
				else
					{
						trueFalseCount++;
						let tmp = '';
						i.answer.toLowerCase() == 'tak' ? tmp = true : tmp = false
						tmp == questions[i.idQuestions].correctAnswer
							? trueFalseCorrect++
							: mistake.push({questions:questions[i.idQuestions].questions, correctAnswer:questions[i.idQuestions].correctAnswer, urAnswer: tmp})
					}
			}
			mistake.push(
				{
					allQueTrueFalse: trueFalseCount,
					allQueChoice: choiceCount,
					allQueReading: readingCount,
					trueFalseCorrect: trueFalseCorrect,
					choiceCorrect: choiceCorrect,
					readingCorrect: readingCorrect,
					allIsCorrect: trueFalseCount == trueFalseCorrect && choiceCount == choiceCorrect && readingCount == readingCorrect ? true : false
				}		
			);
			setResult(mistake);
			if(checkIfAnyAnswerHasBeenGiven)
				updateExamStatistic(
					{
						user:route.params.user,
						time:TimeFromExamTopBar,
						exam: idExam,
						allQuestions: trueFalseCount+choiceCount+readingCount, 
						correct:trueFalseCorrect+choiceCorrect+readingCorrect,
					}
				)
	}

	const renderAnswerBox = (idQuestions) =>{
		if(idQuestions === -1){
			if(!result.length){
				setTimeout(()=>{checkAnswer()},3000)
				return(<Loading />)
			}else if(!checkIfAnyAnswerHasBeenGiven){
				console.log(result)
				return(
					<View style={[styles.BoxContainer,{justifyContent:'center'}]}>
						<Text>Nie udzielono odpowiedzi na żadne pytanie :/ </Text>
					</View>
				)
			}else{
				let allQuestions = result[result.length-1].allQueTrueFalse + result[result.length-1].allQueChoice + result[result.length-1].allQueReading;
				let correct = result[result.length-1].trueFalseCorrect + result[result.length-1].choiceCorrect + result[result.length-1].readingCorrect;
			return(
				<View style={styles.BoxContainer}>
					<View style={[styles.questionsBox, {alignItems:'center', justifyContent:'space-around' ,flexDirection:'row'}]}>
						<View>
							<Text>Pytania tak lub nie - {result[result.length-1].trueFalseCorrect+'/'+result[result.length-1].allQueTrueFalse}</Text>
							<Text>Pytania wyboru - {result[result.length-1].choiceCorrect+'/'+result[result.length-1].allQueChoice}</Text>
							<Text>Dyktanda - {result[result.length-1].readingCorrect+'/'+result[result.length-1].allQueReading}</Text>
						</View>
						<View>
							<CircularProgress
								radius={50}
								value={correct/allQuestions * 100}
								maxValue={100}
								fontSize={20}
								valueSuffix={'%'}
								activeStrokeColor={'#FE7E6D'}
								inActiveStrokeColor={'#2F3A8F'}
								inActiveStrokeOpacity={1}
								progressValueColor={'#2F3A8F'}
								inActiveStrokeWidth={15}
								activeStrokeWidth={20}
							/>
						</View>
					</View>
					<View style={[styles.answerBox,{alignItems:'flex-start', justifyContent:'flex-start'}]}>
						<FlatList 
							data={result}
							keyExtractor={(item)=>{item.index}}
							renderItem={(item)=>{
								if(item.index != result.length - 1){
									if(typeof item.item.correctAnswer === 'boolean'){
										return(
											<View style={styles.mistakeBoxContainer}>
												<View style={styles.mistakeBoxQuestions}>
													<Text style={styles.mistakeBoxQuestionsText}>Pytanie</Text>
													<Text style={styles.mistakeBoxQuestionsText}>{item.item.questions}</Text>
												</View>
												<View style={styles.mistakeBoxAnswerContainer}>
													<View style={styles.mistakeBoxCorrect}>
														<Text>Poprawna odpowiedź:</Text>
														<Text>{item.item.correctAnswer === true ? 'Tak' : 'Nie'}</Text>
													</View>
													<View style={styles.mistakeBoxUrAnswer}>
														<Text>Twoja odpowiedź:</Text>
														<Text>{item.item.urAnswer === true ? 'Tak' : 'Nie'}</Text>
													</View>
												</View>
											</View>
										)
									}
									if(typeof item.item.correctAnswer === 'string'){
										return(
											<View style={styles.mistakeBoxContainer}>
												<View style={styles.mistakeBoxQuestions}>
													<Text style={styles.mistakeBoxQuestionsText}>Pytanie</Text>
													<Text style={styles.mistakeBoxQuestionsText}>{item.item.questions}</Text>
												</View>
												<View style={styles.mistakeBoxAnswerContainer}>
													<View style={styles.mistakeBoxCorrect}>
														<Text>Poprawna odpowiedź:</Text>
														<Text>{item.item.correctAnswer}</Text>
													</View>
													<View style={styles.mistakeBoxUrAnswer}>
														<Text>Twoja odpowiedź:</Text>
														<Text>{item.item.urAnswer != undefined ? item.item.urAnswer : 'Brak Odpowiedzi'}</Text>
													</View>
												</View>
											</View>
										)
									}
									if(item.item.correctAnswer === undefined){
										return(
											<View style={styles.mistakeBoxContainer}>
												<View style={styles.mistakeBoxQuestions}>
													<Text style={styles.mistakeBoxQuestionsText}>Zdanie brzmiało:</Text>
													<Text style={styles.mistakeBoxQuestionsText}>{item.item.questions}</Text>
												</View>
												<View style={styles.mistakeBoxUrAnswer}>
													<Text>Twoja odpowiedź:</Text>
													<Text>{item.item.urAnswer != undefined ? item.item.urAnswer : 'Brak Odpowiedzi'}</Text>
												</View>
											</View>
										)
									}
								}
							}}
						/>
					</View>
				</View> 
			)
		}
		}
			if(questions[idQuestions]?.category == 'TrueFalse'){
				return(
					<View style={styles.BoxContainer}>
						<View style={styles.questionsBox}>
							<Text>{questions[idQuestions]?.questions}</Text>
						</View>
						<View style={styles.answerBox}>
							<ButtonGroup 
								buttonContainerStyle={styles.btnContainer}
								fontStyle={styles.btnFont}
								style={styles.btn}
								styleFocused={styles.btnFocused}
								buttonsLabel={["Tak","Nie"]}
								index={idQuestions}
								onPress={addAnswer}
							/>
						</View>
					</View> 
				)
			}
			if(questions[idQuestions]?.category == 'reading'){
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
								autoCorrect={false}
							/>
							<Button 
								title={"Gotowe"} 
								backgroundColor={!doneChangeText ? '#2F3A8F' : 'gold'}
								width={'40%'}
								height={'10%'}
								fontColor={'#fff'}
								onPress={()=>{setDoneChangeText(true);addAnswer(idQuestions,changeText)}}
							/>
						</View>
							
					</View>
				)
			}
			
			if(questions[idQuestions]?.category == 'choice'){
				let arr = []
				questions[idQuestions]?.answer.map((item, index) =>{arr.push(item)})
				return(
					<View style={styles.BoxContainer}>
						<View style={styles.questionsBox}>
							<Text>{questions[idQuestions]?.questions}</Text>
						</View>
						<View style={styles.answerBoxForChoice}>
							<ButtonGroup 
								buttonContainerStyle={{flexDirection:'column'}}
								fontStyle={{fontSize:15, color:'#fff'}}
								style={styles.answerBoxForChoiceBtn}
								styleFocused={styles.btnFocusedForChoice}
								buttonsLabel={arr}
								index={idQuestions}
								onPress={addAnswer}
							/>
						
						</View>
					</View>
				)
			}
	}

	const backAction =()=>{
		Alert.alert(
			"Przerwij Test",
			"Czy napewno chcesz przerwać test?",
			[
				{
					text:'Nie',
					onPress:()=>null
				},
				{
					text:'Przerwij',
					onPress:()=>{navigation.goBack()},
					style:'cancel'
				}
			]
		)
		return true
	}

	useEffect(()=>{	
		getQuestions();
		BackHandler.addEventListener("hardwareBackPress",backAction)
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
					onPress={ category != -1 ? ()=>{setCategory(generateRandomQuestions()); setDoneChangeText(false)} : ()=> {navigation.goBack()} }
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

	btnFocusedForChoice:{
		backgroundColor:'gold',
		padding:25,
		marginBottom:10
	},

	answerBoxForChoiceBtn:{
		backgroundColor:'#2F3A8F',
		padding:25,
		marginBottom:10
	},

	btnContainer:{
		flexDirection:'row'
	},

	btn:{
		width:150, 
		height:70,
		margin:10,
		borderRadius:25,
		backgroundColor:'#2F3A8F',
		justifyContent:'center',
		alignItems:'center'
	},

	btnFocused:{
		width:150, 
		height:70,
		margin:10,
		borderRadius:25,
		backgroundColor:'gold',
		justifyContent:'center',
		alignItems:'center'
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
	},

	mistakeBoxContainer:{
		backgroundColor:'#2F3A8F',
		marginBottom:10,
	},

	mistakeBoxQuestions:{
		backgroundColor:'#2F3A8F',
		alignItems:'center',
		padding:10,
	},

	mistakeBoxAnswerContainer:{
		flexDirection:'row',
	},

	mistakeBoxCorrect:{
		backgroundColor:'#CCD1E4',
		flex:1,
		padding:10,
		alignItems:'center',
		borderRightWidth:1,
		borderRightColor:'#fff'
	},

	mistakeBoxUrAnswer:{
		backgroundColor:'#CCD1E4',
		flex:1,
		padding:10,
		alignItems:'center'
	},

	mistakeBoxQuestionsText:{
		color:'#fff'
	}
  });