import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';

const Stack = createStackNavigator();

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
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
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
  
