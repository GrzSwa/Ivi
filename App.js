import 'react-native-gesture-handler';
import './FirebaseConfig';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SelectionTopicScreen from './Screens/SelectionTopicScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import SelectionExamScreen from './Screens/SelectionExamScreen';
import ExamScreen from './Screens/ExamScreen';
import StatScreen from './Screens/StatScreen';
import Account from './components/Account';
import TopBar from './components/TopBar';
import TopicScreen from './Screens/TopicScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function Draw(){
    return(
        <Drawer.Navigator screenOptions={{headerShown:false, drawerPosition:'right'}} drawerContent={props => <Account {...props}/>}>
            <Drawer.Screen 
                name="Drawer" 
                component={TabNav} 
            />
        </Drawer.Navigator>
    )
}

function TabNav() {
    const auth = getAuth();
    return (
        <Tab.Navigator tabBar={props => <TopBar {...props}/>}>
            <Tab.Screen name="Tematy" component={SelectionTopicScreen} initialParams={{auth:auth}}/>
            <Tab.Screen name="Testy" component={SelectionExamScreen} initialParams={{auth:auth}}/>
            <Tab.Screen name="Statystyki" component={StatScreen} initialParams={{auth:auth}}/>
        </Tab.Navigator>
    );
  }


export default function App() {
    const auth = getAuth();
    const [ user, setUser ] = useState();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => { user ? setUser(user) : setUser(undefined)})
    },[])

    if(!user){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{headerShown:false}}
                        initialParams={{auth:auth}}
                    />

                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{headerBackTitle:'Cofnij', title: 'Cofnij', headerStyle:{backgroundColor:'#FEECE9'}}}
                        initialParams={{auth:auth}}
                    />

                    <Stack.Screen
                        name="Reset"
                        component={ResetPasswordScreen}
                        options={{headerBackTitle:'Cofnij', title: 'Cofnij', headerStyle:{backgroundColor:'#FEECE9'}}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }else{
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">

                    <Stack.Screen
                        name="Home"
                        component={Draw}
                        options={{headerShown:false}}
                    />

                    <Stack.Screen
                        name="Topic"
                        component={TopicScreen}
                        options={{headerShown:false}}
                    />

                    <Stack.Screen 
                        name="Exam"
                        component={ExamScreen}
                        options={{headerShown:false}}
                    />

                </Stack.Navigator>
            </NavigationContainer> 
        );
    }
}
  
