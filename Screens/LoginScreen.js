import {useEffect, useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, Text, View, SafeAreaView, Platform, TextInput, Alert, TouchableOpacity, StatusBar, Image} from 'react-native';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const SB_HEIGHT = StatusBar.currentHeight;

export default function LoginScreen({navigation, route}) {
    const { control, handleSubmit } = useForm();
    const [icon, setIcon] = useState(undefined);

    useEffect(() => {
        const getImage = async () =>{
            const storage = getStorage();
            const pathReference = ref(storage, '/icon.png');
            await getDownloadURL(pathReference).then((res)=>{
                setIcon(res);
            })
        }
        getImage()
    },[])

    const onSubmit = (data) =>{
        {signInWithEmailAndPassword(route.params.auth, data.Login, data.password).then((cred) => {
            console.log(cred.user.email);
        }).catch((error) => {
            Alert.alert("Niepoprawny login lub hasło",error.message[
                {text: "Cancel",},
                { text: "OK", }
                ]
            );
        })}
    };
    
        return (
            <SafeAreaView style={styles.container}>   
            <View>
                
                <View style={styles.iconBox}>
                    <View style={styles.icon}>
                        <Image source={{uri:icon}} style={{width:'100%',height:'100%'}}/>
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
                    <TouchableOpacity onPress={() => {navigation.navigate("Reset",{auth: route.params.auth})}}>
                        <Text style={styles.actionBtn}>Zapomniałem/am hasła</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                        <Text style={styles.actionBtn}>Stwórz konto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.btn}>
                        <Text>Zaloguj</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </SafeAreaView>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEECE9',
        paddingTop: Platform.OS === 'android' ? SB_HEIGHT : 0,
    },
    iconBox: {
        height:'45%',
        justifyContent:'center',
        alignItems:'center',
    },
   

    icon: {
        width:'50%',
        height:'50%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:1,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 20,
    },
  
    FormBox: {
        height:'50%',
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

    actionBtn:{
        alignItems:'center',
        justifyContent:'center',
        color:'#2F3A8F',
        paddingBottom: 10,
    },
  });
