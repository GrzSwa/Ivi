import {useEffect, useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { LoginScreenStyle } from '../Style';
import { Text, View, SafeAreaView, TextInput, Alert, TouchableOpacity, Image} from 'react-native';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, getAdditionalUserInfo } from 'firebase/auth';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { newUser, getAmountUser } from '../database/newUser';
import { GoogleSocialButton } from "react-native-social-buttons";
import Hr from '../components/Hr';
//const SB_HEIGHT = StatusBar.currentHeight;

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({navigation, route}) {
    const { control, handleSubmit } = useForm();
    const [icon, setIcon] = useState(undefined);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '617087916984-2i5sc1hjcunp2ngu4iirfs5khtk0m9ds.apps.googleusercontent.com',
        },
    );

   useEffect(()=>{
        getAmountUser();
        if (response?.type === 'success') {
            console.log(response);
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(route.params.auth, credential)
                .then((res)=>{
                    getAdditionalUserInfo(res).isNewUser ? newUser(res.user.email) : null
                }
            ).catch((error) => {
                Alert.alert("Coś poszło nie tak",error.message,[{ text: "OK" }]);
            });
        }
    },[response])
    

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
            Alert.alert("Niepoprawny login lub hasło",[
                { text: "OK", }
                ]
            );
        })}
    };
    
        return (
            <SafeAreaView style={LoginScreenStyle.container}>   
            <View>
                
                <View style={LoginScreenStyle.iconBox}>
                    <View style={LoginScreenStyle.icon}>
                        <Image source={{uri:icon}} style={{width:'100%',height:'100%'}}/>
                    </View>        
                </View>
                
                <View style={LoginScreenStyle.FormBox}>
                    <Controller
                        control={control}
                        name="Login"
                        rules={{require:true}}
                        render={({field: {value, onChange}, fieldState:{error}}) => 
                            <TextInput 
                                style={LoginScreenStyle.input}
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
                                style={LoginScreenStyle.input}
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
                        <Text style={LoginScreenStyle.actionBtn}>Zapomniałem/am hasła</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                        <Text style={LoginScreenStyle.actionBtn}>Stwórz konto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={LoginScreenStyle.btn}>
                        <Text>Zaloguj</Text>
                    </TouchableOpacity>
                    <Hr 
                        label={'Lub zaloguj się przez:'}
                        color={'#6c757d'}
                        colorLine={'#6c757d'}
                        fontSize={11}
                        height={0.5}
                    />
                    <TouchableOpacity 
                        disabled={!request}
                        style={LoginScreenStyle.otherSignIn}>
                        <GoogleSocialButton buttonText={'Zaloguj się przez Google'} onPress={()=>{promptAsync()}}/>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </SafeAreaView>
        );
}


/*const Styles = StyleSheet.create({
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
        marginTop:10,
        marginBottom:10
    },

    actionBtn:{
        alignItems:'center',
        justifyContent:'center',
        color:'#2F3A8F',
        paddingBottom: 10,
    },

    otherSignIn:{
        marginTop:10,
    }
  });*/
