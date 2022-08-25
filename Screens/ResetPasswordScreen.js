import React from "react";
import { Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { ResetPasswordScreenStyle } from "../Style";
import { useForm, Controller } from "react-hook-form";
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPasswordScreen({navigation, route}) {

    const { control, handleSubmit} = useForm();

    const confirm = (data) => sendPasswordResetEmail(route.params.auth,data.email);
    
    const onSubmit = (data) =>{
        Alert.alert("Na pewno?","Jesteś pewny, że chcesz zresetować hasło dla podanego adresu e-mail?",[
            {text: "Tak", onPress : confirm(data)},
            {text: "Anuluj", }
            ]
        );
    } 
    return (
        <View style={ResetPasswordScreenStyle.container}>
            <View style={ResetPasswordScreenStyle.FormBox}>
                <Controller
                    control={control}
                    name="email"
                    rules={{require:true}}
                    render={({field: {value, onChange}}) => 
                        <TextInput 
                            style={ResetPasswordScreenStyle.input}
                            placeholder='Adres e-mail'
                            value={value}
                            onChangeText={onChange}
                            placeholderTextColor='white'
                        />
                    }
                />

                <Controller
                    control={control}
                    name="emailConfirmed"
                    rules={{require:true}}
                    render={({field: {value, onChange}}) => 
                        <TextInput 
                            style={ResetPasswordScreenStyle.input}
                            placeholder='Potwierdź adres e-mail'
                            value={value}
                            onChangeText={onChange}
                            placeholderTextColor='white'
                        />
                    }
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={ResetPasswordScreenStyle.btn}>
                    <Text>Resetuj Hasło</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feece9',
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
});*/
