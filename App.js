import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import { db } from './FirebaseConfig';
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { useState } from 'react';

export default function App() {
    const [tab, setTab] = useState([])
    async function readData(){
        const querySnapshot = await getDocs(collection(db, "/Wiedza/pisownia ou/Zadania/"));
            querySnapshot.forEach((doc) => {
            //console.log(doc.data());
            //setTab(doc.data());
            console.log(tab);
            console.log("-----------------------");
        });
    } 
    return (
        <View style={styles.container}>
            <Button title="kliknij" onPress={readData}></Button>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
