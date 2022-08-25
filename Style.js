import { StyleSheet,StatusBar, Platform, Dimensions } from 'react-native';

const SB_HEIGHT = StatusBar.currentHeight;
const WIDTH = Dimensions.get("screen").width
const COLORS = {
    first: '#FEECE9',
    second: '#CCD1E4',
    third: '#FE7E6D',
    four: '#2F3A8F'
}

export const LoginScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.first,
        paddingTop: Platform.OS === 'android' ? SB_HEIGHT : 0,
    },
    iconBox: {
        height:'45%',
        justifyContent:'center',
        alignItems:'center',
    },
   
    icon: {
        width:'50%',
        height:'50%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:1,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 20,
    },
  
    FormBox: {
        height:'50%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
  
    input: {
        backgroundColor: COLORS.four,
        color:COLORS.second,
        width: 300,
        height: 40,
        padding: 10,
        borderRadius: 30,
        marginBottom:20,
        
    },

    btn:{
        backgroundColor: '#50FF70',
        width: 300,
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        padding: 10,
        borderRadius: 30,
        marginTop:10,
        marginBottom:10
    },

    actionBtn:{
        alignItems:'center',
        justifyContent:'center',
        color:COLORS.four,
        paddingBottom: 10,
    },

    otherSignIn:{
        marginTop:10,
    }
  });

export const RegisterScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.first,
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    FormBox: {
        height:'80%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
  
    input: {
        backgroundColor: COLORS.four,
        color:COLORS.second,
        width: 300,
        height: 40,
        padding: 10,
        borderRadius: 30,
        marginBottom:20,
    },
  
    btn:{
        backgroundColor: '#50FF70',
        width: 300,
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        padding: 10,
        borderRadius: 30,
        marginTop:20
    },
  
    title:{
        alignItems:'center',
        justifyContent:'center',
        color:COLORS.four,
        padding: 5,
        fontSize:25,
        marginBottom:20
    },
  });

export const ResetPasswordScreenStyle = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: COLORS.first,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    FormBox: {
        padding:20,
        width:'100%',
        height:'80%',
        justifyContent:'center',
        alignItems:'center',
    },
  
    input: {
        backgroundColor: COLORS.four,
        color:COLORS.second,
        width: 300,
        height: 40,
        padding: 10,
        borderRadius: 30,
        marginBottom:20,
    },
 
    btn:{
        backgroundColor: '#50FF70',
        width: 300,
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        padding: 10,
        borderRadius: 30,
        marginTop:20
    },
  });

export const SelectionTopicScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:COLORS.first,
        paddingTop:30,
    },
  
    listSpace: {
        width:'90%',
    },
  
    listStyleContainer: {
        backgroundColor:COLORS.second,
        marginVertical: 8,
        width:'100%',
        height:120,
        flexDirection:'row',
        padding:20,
        borderRadius:25,
    },
    picture: {
        backgroundColor:COLORS.four,
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
  });

export const SelectionExamScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:COLORS.first,
        paddingTop:30,
    },

    examListStyleContainer: {
        backgroundColor: COLORS.second,
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

export const StatScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:COLORS.first,   
        paddingTop:30, 
    },

    progress: {
        alignItems: 'center',
        width:'90%',
        paddingBottom:15,   
    },

    bestStat: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width:'90%',   
        padding:10,
    },

    bestStatView: {
        alignItems: 'center',
        height:130,
        padding:5,
        borderRadius:25,
        width:"30%",
        backgroundColor:COLORS.third,
        borderRadius:25
    },

    otherStat: {
        justifyContent:'space-evenly',
        width:'90%',   
    },

    otherStatView: {
        backgroundColor:COLORS.second,
        flexDirection:'row',
        alignItems: 'center',   
        marginVertical:10,
        height:80,
        borderRadius:25
    },

    otherStatViewLeft: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:COLORS.four,
        height:'100%',
        flex:1,   
        borderRadius:25,
    },

    otherStatViewRight: {
        alignItems: 'center',
        flex:5,   
    },

    txt:{
        color:'#fff',
        fontSize:24,
        textAlign:'center',
        fontWeight:'bold'
    }
  });

export const TopicScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:COLORS.first,
    },

	actionBtn:{
		width:'90%',
		marginTop:25,
		height:90,
		flexDirection:'row',
		justifyContent:'space-evenly',
		alignItems:'center'
	}
  });

export const ExamScreenStyle = StyleSheet.create({
    container: {
	  backgroundColor:COLORS.first,
	  height:'100%'
    },

	questionsBox:{
		backgroundColor:COLORS.second,
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
		backgroundColor:COLORS.four,
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
		backgroundColor:COLORS.four,
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
		backgroundColor:COLORS.third,
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
		backgroundColor:COLORS.four,
		marginBottom:10,
	},

	mistakeBoxQuestions:{
		backgroundColor:COLORS.four,
		alignItems:'center',
		padding:10,
	},

	mistakeBoxAnswerContainer:{
		flexDirection:'row',
	},

	mistakeBoxCorrect:{
		backgroundColor:COLORS.second,
		flex:1,
		padding:10,
		alignItems:'center',
		borderRightWidth:1,
		borderRightColor:'#fff'
	},

	mistakeBoxUrAnswer:{
		backgroundColor:COLORS.second,
		flex:1,
		padding:10,
		alignItems:'center'
	},

	mistakeBoxQuestionsText:{
		color:'#fff'
	}
  });

export const AccountStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.third,
        alignItems:'center',
        justifyContent:'space-between'
    },
    avatar:{
        alignItems:'center',
        marginTop:50,
    },

    btn:{
        marginBottom:'20%'
    }
  });

export const TopBarStyle = StyleSheet.create({
    container: {
        backgroundColor:COLORS.third,
        paddingTop: Platform.OS == 'android' ? SB_HEIGHT : 0,
        height:'20%',
        justifyContent:'flex-end',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        marginBottom:-15,
        zIndex:1000,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    firstRow: {
        padding:25,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    btnBackground: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingBottom:10
    },
    btn:{
        padding:2
    },
  
    btnUnderline:{
        width:20,
        height:3,
        backgroundColor:'#000',
        borderRadius:50,
        marginTop:2
    }
  });

export const TopicTopBarStyle = StyleSheet.create({
    container: {
        backgroundColor:COLORS.third,
        paddingTop: Platform.OS == 'android' ? SB_HEIGHT : 0,
        height:'15%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        zIndex:1000,
        width:'100%',
        marginBottom:20,
        justifyContent:'space-around'
    },
    firstRow: {
        alignItems:'center',
        flexDirection:'row',
        position:'relative'
    }
  });

export const LoadingStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:COLORS.first,
        paddingTop:30,
    },
    listSpace: {
        alignItems: 'center',
        width:'80%',
    },
  });

export const LessonBoxStyle = StyleSheet.create({
    box:{
        width:WIDTH*0.9,
        height:400,
        backgroundColor:COLORS.second,
    },
    desc:{
        width:WIDTH*0.9,
        alignItems:'center',
        justifyContent:'center',
        padding:20,
        flex:2
    }
  });

export const ExamTopBarStyle = StyleSheet.create({
    container: {
        backgroundColor:COLORS.third,
        paddingTop: Platform.OS == 'android' ? SB_HEIGHT : 0,
        height:'15%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        zIndex:1000,
        width:'100%',
        marginBottom:20,
        justifyContent:'space-around'
    },
    firstRow: {
        alignItems:'center',
        flexDirection:'row',
        position:'relative'
    },
    timerStyle:{

    },
    stopwatch:{
        position:'absolute', 
        marginLeft:10, 
        zIndex:1,
        flexDirection:'row'
    }
  });

//ExamStatusStyle----------------------------------BEGIN
export const beginningStyle = StyleSheet.create({    
  
    exam: {
        backgroundColor: COLORS.four,
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        flex:1,
        borderRadius:25,
    },
  
    examDescriptions: {
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        flex:2
    },
  });

export const triedStyle = StyleSheet.create({    
  
      lastTry: {
          alignItems:'center',
          justifyContent:'flex-end',
          height:'85%',
          flex:1,
      },

      first:{
        width:'100%',
        padding:10,
        alignItems:'center',
      },

      second:{
        width:'100%',
        padding:5,
        alignItems:'center',
      },
  
      exam: {
        backgroundColor: COLORS.four,
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        flex:1,
        borderRadius:25,
    },
  
      btn: {
          height:'85%',
          flex:1,
          justifyContent:'center'
      },
  });  

export const completedStyle = StyleSheet.create({    
  
    exam: {
        backgroundColor: COLORS.four,
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        flex:1,
        borderRadius:25,
    },
  
    examDescriptions: {
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        flex:2
    },
  });
//ExamStatusStyle----------------------------------END