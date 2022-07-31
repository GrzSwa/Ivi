import { StyleSheet, View, SafeAreaView, ActivityIndicator } from 'react-native';

export const Loading = (props) => {
    return(
		<SafeAreaView style={styles.container}>
			<View style={styles.listSpace}>
				<ActivityIndicator size="large" color="#2F3A8F" />
			</View>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#FEECE9',
        paddingTop:30,
    },
    listSpace: {
        alignItems: 'center',
        width:'80%',
    },
});