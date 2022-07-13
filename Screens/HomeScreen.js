import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

export default function HomeScreen({navigation, route}) {
    const check = () =>{
        console.log(route.params.user)
    } 

    if(route.params.user){
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>asd</Text>
                    <Button title="show params" onPress={check}/>
                </View>
            </SafeAreaView>
        );
    }else{
        return (
            <SafeAreaView style={styles.container}>
                <View>                        
                    <Text>UPS x_x</Text>
                </View>
            </SafeAreaView>
        );
    }
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
