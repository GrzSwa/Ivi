import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View,Text, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const Account = props => {
    const auth= getAuth();
    return (
        <View style={{flex: 1}} >
            <DrawerContentScrollView>
                    <Text>Dziala</Text>
                    <Button title="wyloguj" onPress={() => {signOut(auth), props.navigation.navigate("Login")}}/>
            </DrawerContentScrollView>		
        </View>
    );
}

export default Account;