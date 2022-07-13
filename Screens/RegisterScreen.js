import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default function RegisterScreen({navigation}) {

    const { control, handleSubmit} = useForm();
    const onSubmit = (data) =>{
        {createUserWithEmailAndPassword(auth,data.email,data.password).then((cred) => {
            Alert.alert("Konto stworzone! :D","Wysłalismy link potwierdzający założenie konta na twój adres email",
            [
                { text: "OK", }
            ]
            );
        })}

    }
    return (
        <SafeAreaView style={styles.container}>   
            <View style={styles.FormBox}>
                <Text>Tworzenie Konta</Text>
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
                        />
                    }
                />
                <Button title="Stwórz konto" onPress={handleSubmit(onSubmit)}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  FormBox: {
    backgroundColor: 'dodgerblue',
    height:'80%',
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
