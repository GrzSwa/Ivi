import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { Loading } from '../components/Loading';
import CircularProgress from 'react-native-circular-progress-indicator';
import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';

export default function StatScreen() {
    const [progress, setProgress] = useState(1);
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
            var arr = [];
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
                if(data[id].PostepTematow[j].IloscProb >= atempt)
                    atempt = data[id].PostepTematow[j].IloscProb
            }
            arr.push({
                time: data[id].NajlepszyCzas,
                topic: data[id].NajlepszyTemat,
                avg: data[id].SredniWynik,
                strike: data[id].Strike,
                mistake: mistake,
                atempt: atempt
            });
            setStat(arr);
            setLoading(false);
        })
    }

    useEffect(()=>{
        getAmountExam();
        getStatistic();
    },[])

if(!loading)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progress}>
                <CircularProgress //https://www.npmjs.com/package/react-native-circular-progress-indicator
                    radius={100}
                    value={progress}
                    maxValue={amount}
                    fontSize={20}
                    valueSuffix={'/'+amount}
                    activeStrokeColor={'gold'}
                    inActiveStrokeColor={'black'}
                    inActiveStrokeOpacity={1}
                    progressValueColor={'blue'}
                />
                <Text>Rozwiązane testy</Text>
            </View>

            <View style={styles.bestStat}>
                <View style={styles.bestStatView}>
                    <Text>{stat[0].strike}</Text>
                    <Text>1 statystyka</Text>
                </View>

                <View style={styles.bestStatView}>
                    <Text>{stat[0].time}</Text>
                    <Text>2 statystyka</Text>
                </View>

                <View style={styles.bestStatView}>
                    <Text>{stat[0].topic}</Text>
                    <Text>3 statystyka</Text>
                </View>
            </View>

            <View style={styles.otherStat}>
                <View style={styles.otherStatView}>
                    <View style={{backgroundColor:'mediumseagreen', alignItems:'center', width:'15%'}}>
                        <Text>{stat[0].avg}%</Text>
                    </View>

                    <View style={{backgroundColor:'mediumaquamarine', alignItems:'center', width:'85%'}}>
                        <Text>Średni wynik</Text>
                    </View>
                </View>

                <View style={styles.otherStatView}>
                    <View style={{backgroundColor:'mediumseagreen', alignItems:'center', width:'15%'}}>
                            <Text>{stat[0].atempt}</Text>
                        </View>

                        <View style={{backgroundColor:'mediumaquamarine', alignItems:'center', width:'85%'}}>
                            <Text>Powtórzonych testów</Text>
                        </View>
                    </View>

                <View style={styles.otherStatView}>
                    <View style={{backgroundColor:'mediumseagreen', alignItems:'center', width:'15%'}}>
                            <Text>{stat[0].mistake}</Text>
                        </View>

                        <View style={{backgroundColor:'mediumaquamarine', alignItems:'center', width:'85%'}}>
                            <Text>Najwięcej błędów</Text>
                        </View>
                    </View>
            </View>
            <Button title="show method"/>
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
        backgroundColor:'dodgerblue',   
        paddingTop:30, 
    },

    progress: {
        alignItems: 'center',
        backgroundColor:'skyblue',
        width:'80%',   
    },

    bestStat: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor:'seagreen',
        width:'80%',   
        padding:10,
    },

    bestStatView: {
        alignItems: 'center',
        backgroundColor:'palegreen',
        padding:5,
    },

    otherStat: {
        justifyContent:'space-between',
        backgroundColor:'mediumturquoise',
        width:'80%',   
    },

    otherStatView: {
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'mediumspringgreen',   
    },
});