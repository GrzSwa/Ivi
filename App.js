import 'react-native-gesture-handler';
import './FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SelectionTopicScreen from './Screens/SelectionTopicScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import SelectionExamScreen from './Screens/SelectionExamScreen';
import ExamScreen from './Screens/ExamScreen'; //Jakieś problemy z tym
import StatScreen from './Screens/StatScreen';
import Account from './components/Account';
import TopBar from './components/TopBar';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function Draw(){
    return(
        <Drawer.Navigator screenOptions={{headerShown:false, drawerPosition:'right'}} drawerContent={props => <Account {...props}/>}>
            <Drawer.Screen name="Drawer" component={TabNav} />
        </Drawer.Navigator>
    )
}

function TabNav() {
    return (
        <Tab.Navigator tabBar={props => <TopBar {...props}/>}>
            <Tab.Screen name="Tematy" component={SelectionTopicScreen} />
            <Tab.Screen name="Testy" component={SelectionExamScreen} />
            <Tab.Screen name="Statystyki" component={StatScreen} />
        </Tab.Navigator>
    );
  }

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown:false}}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{headerBackTitle:'Cofnij', title: 'Cofnij'}}
                />

                <Stack.Screen
                    name="Home"
                    component={Draw}
                    options={{headerShown:false}}
                />

                <Stack.Screen
                    name="Reset"
                    component={ResetPasswordScreen}
                />


            </Stack.Navigator>
        </NavigationContainer> 
    );
}
  
