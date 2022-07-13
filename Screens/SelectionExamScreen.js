import { StyleSheet, Text, View, SafeAreaView, Button, Platform } from 'react-native';

export default function SelectionExamScreen() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>Selection Exam Screen</Text>
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