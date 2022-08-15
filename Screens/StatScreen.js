import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { Loading } from '../components/Loading';
import CircularProgress from 'react-native-circular-progress-indicator';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

export default function StatScreen() {
    const [progress, setProgress] = useState(0);
    const [amount, setAmount] = useState(0);
    const [stat, setStat] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    function getAmountExam(){
        const readData = ref(db,'/Konta');
        onValue(readData,(snapshot)=>{
            var amount = 0; 
            snapshot.forEach((res)=>{
                amount = res.val().PostepTematow.length;
            })
            setAmount(amount);
        })
    }
    
    function getStatistic(){
        const readData = ref(db,'/Konta');
        onValue(readData,(snapshot)=>{
            var data = snapshot.val();
            var id = 0;
            var mistake = 0;
            var atempt = 0;
            var avg = 0;
            var repetitions = '';
            var arr = [];
            var counter = 0;
            for(let i in data){
                if(auth.currentUser.email == data[i].Email){
                    var id = i;
                }
            }
            for(let j in data[id].PostepTematow){
                mistake = data[id].PostepTematow[0].Bledy;
                atempt =  data[id].PostepTematow[0].IloscProb;
                if(data[id].PostepTematow[j].Bledy >= mistake)
                    mistake = data[id].PostepTematow[j].Bledy;
                if(data[id].PostepTematow[j].IloscProb >= atempt){
                    atempt = data[id].PostepTematow[j].IloscProb;
                    repetitions = data[id].PostepTematow[j].Pisownia;
                }
                avg += data[id].PostepTematow[j].wynik;
                if(data[id].PostepTematow[j].wynik != 0)
                    counter++;
            }
            arr.push({
                time: data[id].NajlepszyCzas,
                topic: data[id].NajlepszyTemat,
                avg: avg,
                strike: data[id].Strike,
                mistake: mistake,
                atempt: atempt,
                repetitions:atempt == 0 ? '-' : repetitions.replace("Pisownia","")
            });
            setStat(arr);
            setLoading(false);
            setProgress(counter);
        })
    }

    useEffect(()=>{
        getAmountExam();
        getStatistic();
    },[])

if(!loading)
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>    
                <View style={styles.progress}>
                    <CircularProgress //https://www.npmjs.com/package/react-native-circular-progress-indicator
                        radius={100}
                        value={progress}
                        maxValue={amount}
                        fontSize={20}
                        valueSuffix={'/'+amount}
                        activeStrokeColor={'#FE7E6D'}
                        inActiveStrokeColor={'#2F3A8F'}
                        inActiveStrokeOpacity={1}
                        progressValueColor={'#2F3A8F'}
                        inActiveStrokeWidth={40}
                        activeStrokeWidth={45}
                    />
                    <Text style={{marginTop:10, color:'#2F3A8F', fontWeight:'bold', fontSize:14}}>Rozwiązane testy</Text>
                </View>

                <View style={styles.bestStat}>
                    <View style={styles.bestStatView}>
                        <Text style={[styles.txt,{fontSize:35}]}>{stat[0].strike}</Text>
                        <Text style={[styles.txt,{fontSize:12}]} >Rozwiązanych zadań z rzędu</Text>
                    </View>

                    <View style={styles.bestStatView}>
                        <Text style={[styles.txt,{fontSize:15, marginTop:15, marginBottom:10}]}>{stat[0].time}</Text>
                        <Text style={[styles.txt,{fontSize:12}]} >Najszybciej rozwiązany test</Text>
                    </View>

                    <View style={styles.bestStatView}>
                        <Text style={[styles.txt,{fontSize:35}]}>{stat[0].topic}</Text>
                        <Text style={[styles.txt,{fontSize:12}]}>Najlepszy twój test</Text>
                    </View>
                </View>

                <View style={styles.otherStat}>
                    <View style={styles.otherStatView}>
                        <View style={styles.otherStatViewLeft}>
                            <Text style={[styles.txt,{fontSize:18}]} >{stat[0].avg/amount}%</Text>
                        </View>

                        <View style={styles.otherStatViewRight}>
                            <Text style={[styles.txt,{fontSize:14, color:'#000'}]}>Twój średni wynik</Text>
                        </View>
                    </View>

                    <View style={styles.otherStatView}>
                            <View style={styles.otherStatViewLeft}>
                                <Text style={styles.txt} >{stat[0].atempt}</Text>
                            </View>

                            <View style={styles.otherStatViewRight}>
                                <Text style={[styles.txt,{fontSize:14, color:'#000'}]} >Najwięcej powtórzonych testów z: "{stat[0].repetitions}"</Text>
                            </View>
                        </View>

                    <View style={styles.otherStatView}>
                            <View style={styles.otherStatViewLeft}>
                                <Text style={styles.txt}  >{stat[0].mistake}</Text>
                            </View>

                            <View style={styles.otherStatViewRight}>
                                <Text style={[styles.txt,{fontSize:14, color:'#000'}]} >Najwięcej błędów w jednym teście</Text>
                            </View>
                        </View>
                </View>
            </SafeAreaView>
        </ScrollView>
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
        backgroundColor:'#FEECE9',   
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
        backgroundColor:'#FE7E6D',
        borderRadius:25
    },

    otherStat: {
        justifyContent:'space-evenly',
        width:'90%',   
    },

    otherStatView: {
        backgroundColor:'#CCD1E4',
        flexDirection:'row',
        alignItems: 'center',   
        marginVertical:10,
        height:80,
        borderRadius:25
    },

    otherStatViewLeft: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#2F3A8F',
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