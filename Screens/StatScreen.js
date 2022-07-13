import { StyleSheet, Text, View, SafeAreaView, Button, Platform } from 'react-native';

export default function StatScreen() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>Stattistics Screen</Text>
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