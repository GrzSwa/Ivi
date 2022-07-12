import { StyleSheet, Text, View, SafeAreaView, Platform, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default function LoginScreen({navigation}) {

    const { control, handleSubmit} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
        if( data.Login < 1 || data.password < 1 || data.Login == undefined || data.password == undefined){
            Alert.alert("Błąd logowania","Niepoprawny login lub hasło",[
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }else{
            {signInWithEmailAndPassword(auth, data.Login, data.password).then((cred) => {
                
                navigation.navigate("Home", {user: cred});
                console.log(cred.user.email);
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
                                style={styles.input}
                                placeholder='Hasło'
                                value={value}
                                onChangeText={onChange}
                            />
                        }
                    />
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
    borderColor:"black",
    marginBottom:20,
  },
});
