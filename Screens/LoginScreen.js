
import React, {useEffect, useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, Text, View, SafeAreaView, Platform, TextInput, Button, Alert, TouchableOpacity, StatusBar} from 'react-native';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import { ref, onValue } from "firebase/database";

const SB_HEIGHT = StatusBar.currentHeight;

export default function LoginScreen({navigation, route}) {
    const auth = getAuth();
    const [ user, setUser ] = useState();
    const { control, handleSubmit } = useForm();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => { {user ? setUser(user) : setUser(undefined)} })
    },[])

    const onSubmit = (data) =>{
        console.log(data);
        {signInWithEmailAndPassword(auth, data.Login, data.password).then((cred) => {
            navigation.navigate("Home", {user: cred});
            console.log(cred.user.email);
        }).catch((error) => {
            Alert.alert("Błąd logowania firebase","Niepoprawny login lub hasło",[
                {text: "Cancel",},
                { text: "OK", }
                ]
            );
        })}
    };
    

    if (!user){
        return (
            <SafeAreaView style={styles.container}>   
            <View>
                <View style={styles.iconBox}>
                    <View style={styles.icon}>
                        <Text>Logo</Text>
                    </View>
                </View>
                <View style={styles.FormBox}>
                    <Controller
                        control={control}
                        name="Login"
                        rules={{require:true}}
                        render={({field: {value, onChange}, fieldState:{error}}) => 
                            <TextInput 
                                defaultValue='G.swajda@gmail.com'
                                style={styles.input}
                                placeholder='Login'
                                value={value}
                                onChangeText={onChange}
                            />
                        }
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{require:true}}
                        render={({field: {value, onChange}}) => 
                            <TextInput 
                                defaultValue='qwerty'
                                style={styles.input}
                                placeholder='Hasło'
                                value={value}
                                onChangeText={onChange}
                            />
                        }
                    />
                    <TouchableOpacity onPress={() => {navigation.navigate("Reset",{auth: auth})}}>
                        <Text>Zapomniałem/am hasła</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                        <Text>Stwórz konto</Text>
                    </TouchableOpacity>

                    <Button title="Zaloguj" onPress={handleSubmit(onSubmit)}/>
                    <Button title="Show Params" onPress={()=>{console.log(route.params); console.log(auth.currentUser)}}/>
                </View>
            </View>
        </SafeAreaView>
        );
    }else{
        return(
            <View>
                {navigation.navigate("Home")}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      paddingTop: Platform.OS === 'android' ? SB_HEIGHT : 0,
    },
    iconBox: {
      backgroundColor: 'yellow',
      height:'45%',
      justifyContent:'center',
      alignItems:'center',
    },
  
    icon: {
      backgroundColor: 'gold',
      width:'50%',
      height:'50%',
      justifyContent:'center',
      alignItems:'center',
    },
  
    FormBox: {
      backgroundColor: 'dodgerblue',
      height:'50%',
      justifyContent:'flex-start',
      alignItems:'center',
    },
  
    input: {
      backgroundColor: 'white',
      width: 300,
      height: 40,
      padding: 10,
      borderRadius: 4,
      borderWidth:2,
      marginBottom:20,
    },
  });
