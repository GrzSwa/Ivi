import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen({navigation}) {

    const { control, handleSubmit} = useForm();
    const [warning, setWarning] = useState(false);

    const onSubmit = (data) =>{
        console.log(data);
        if( data.Login < 1 || data.password < 1 || data.Login == undefined || data.password == undefined){
            {setWarning(!warning)}
        }else{
            {setWarning(!warning)}
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
    }

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
                                style={[styles.input, {borderColor: warning ? "red" : "black",}]}
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
                                style={[styles.input, {borderColor: warning ? "red" : "black",}]}
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
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
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
