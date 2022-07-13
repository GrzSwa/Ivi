import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { getAuth, signOut} from 'firebase/auth';

export default function HomeScreen({navigation, route}) {
    
    const auth = getAuth();

        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>asd</Text>
                    <Button title="show params" onPress={()=>{console.log(auth)}}/>
                    <Button title="wyloguj" onPress={() => {signOut(auth), navigation.navigate("Login")}}/>
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
    backgroundColor:'dodgerblue',
  },
});
