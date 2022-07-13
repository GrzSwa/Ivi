import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import Account from './components/Account';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Draw(){
    return(
        <Drawer.Navigator screenOptions={props => <Account {...props}/>}>
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    )
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
  
