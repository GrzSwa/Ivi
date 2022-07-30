import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { getAuth,createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { db } from '../FirebaseConfig';
import { ref, set, onValue } from "firebase/database";
import { useEffect, useState } from 'react';

export default function RegisterScreen({navigation}) {
    const auth = getAuth();
    const [newUserDatabaseSpace, SetNewUserDatabaseSpace] = useState(0);
    const [topicImprove, setTopicImprove] = useState([]);
    const { control, handleSubmit} = useForm();
    
    function writeUserData(userNumber,email) {
        set(ref(db, '/Konta/' + userNumber), {
            Email: email,
            NajlepszyCzas: "00:00:00",
            NajlepszyTemat : "",
            Strike: 0,
            PostepTematow: topicImprove
        });
    }

    const onSubmit = (data) =>{
        {createUserWithEmailAndPassword(auth,data.email,data.password).then((cred) => {
            updateProfile(auth.currentUser, {displayName:data.userName});
            Alert.alert("Konto stworzone! :D","Wysłalismy link potwierdzający założenie konta na twój adres email",
            [
                { text: "OK", }
            ]
            );
            navigation.navigate("Login", {flag: true})
        }).catch((error) => {
            if(error.code == 'auth/email-already-in-use'){
                Alert.alert("Błąd","Istnieje już konto o tym adresie email",
                [
                    { text: "OK", }
                ])
            }
        })}
        writeUserData(newUserDatabaseSpace,data.email)
    }
    
    function getAmountUser(){
        const readData = ref(db,'/')
        onValue(readData,(snapshot)=>{
            var amount = snapshot.val()['Konta'].length;;
            var arr = [];
            for(let j in snapshot.val()['Tematy']){
                arr.push({
                    Pisownia: snapshot.val()['Tematy'][j].Pisownia,
                    Postep:0,
                    IloscProb:0,
                    Bledy:0,
                    wynik:0,
                    OstatniaProba:0

                })
            }
        setTopicImprove(arr);
        SetNewUserDatabaseSpace(amount);
        })
    }

    useEffect(()=>{
        getAmountUser()
    },[])

    return (
        <SafeAreaView style={styles.container}>   
            <View style={styles.FormBox}>
                <Text style={styles.title}>Tworzenie Konta</Text>
                <Controller
                    control={control}
                    name="userName"
                    rules={{require:true}}
                    render={({field: {value, onChange}}) => 
                        <TextInput 
                            style={styles.input}
                            placeholder='Nazwa użytkownika'
                            value={value}
                            onChangeText={onChange}
                            placeholderTextColor='white'
                        />
                    }
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{require:true}}
                    render={({field: {value, onChange}}) => 
                        <TextInput 
                            style={styles.input}
                            placeholder='Adres email'
                            value={value}
                            onChangeText={onChange}
                            placeholderTextColor='white'
                        />
                    }
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{require:true}}
                    render={({field: {value, onChange}}) => 
                        <TextInput 
                            style={styles.input}
                            placeholder='Hasło'
                            value={value}
                            onChangeText={onChange}
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            multiline={false}
                        />
                    }
                />

                <Controller
                    control={control}
                    name="passwordConfirmed"
                    rules={{require:true}}
                    render={({field: {value, onChange}}) => 
                        <TextInput 
                            style={styles.input}
                            placeholder='Potwierdź hasło'
                            value={value}
                            onChangeText={onChange}
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            multiline={false}
                        />
                    }
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.btn}>
                    <Text>Stwórz Konto</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEECE9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  FormBox: {
    height:'80%',
    justifyContent:'flex-start',
    alignItems:'center',
  },

  input: {
    backgroundColor: '#2F3A8F',
    color:'#CCD1E4',
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
        color:'#2F3A8F',
        padding: 5,
        fontSize:25,
        marginBottom:20
    },
});
