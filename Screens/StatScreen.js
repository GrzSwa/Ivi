import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Platform } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function StatScreen() {
    const [progress, setProgress] = useState(13)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progress}>
                <CircularProgress //https://www.npmjs.com/package/react-native-circular-progress-indicator
                    radius={100}
                    value={progress}
                    maxValue={15}
                    fontSize={20}
                    valueSuffix={'/15'}
                    activeStrokeColor={'white'}
                    inActiveStrokeColor={'red'}
                    inActiveStrokeOpacity={1}
                    progressValueColor={'blue'}
                />
            </View>

            <View style={styles.bestStat}>
                <View style={styles.bestStatView}>
                    <Text>10</Text>
                    <Text>1 statystyka</Text>
                </View>

                <View style={styles.bestStatView}>
                    <Text>00:03:36</Text>
                    <Text>2 statystyka</Text>
                </View>

                <View style={styles.bestStatView}>
                    <Text>Rż</Text>
                    <Text>3 statystyka</Text>
                </View>
            </View>

            <View style={styles.otherStat}>
                <View style={styles.otherStatView}>
                    <View style={{backgroundColor:'mediumseagreen', alignItems:'center', width:'15%'}}>
                        <Text>95%</Text>
                    </View>

                    <View style={{backgroundColor:'mediumaquamarine', alignItems:'center', width:'85%'}}>
                        <Text>Średni wynik</Text>
                    </View>
                </View>

                <View style={styles.otherStatView}>
                    <View style={{backgroundColor:'mediumseagreen', alignItems:'center', width:'15%'}}>
                            <Text>2</Text>
                        </View>

                        <View style={{backgroundColor:'mediumaquamarine', alignItems:'center', width:'85%'}}>
                            <Text>Powtórzonych testów</Text>
                        </View>
                    </View>

                <View style={styles.otherStatView}>
                    <View style={{backgroundColor:'mediumseagreen', alignItems:'center', width:'15%'}}>
                            <Text>1</Text>
                        </View>

                        <View style={{backgroundColor:'mediumaquamarine', alignItems:'center', width:'85%'}}>
                            <Text>Najwięcej błędów</Text>
                        </View>
                    </View>
            </View>
        </SafeAreaView>
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