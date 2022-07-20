import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Button} from 'react-native';


export default function TopicScreen({navigation, route}) {
	return (
	    <SafeAreaView style={styles.container}>
            <View>
                <Text>{route.params.id}</Text>
            </View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'dodgerblue',
    },
  });