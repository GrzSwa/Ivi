import { View,Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from './Button';

const Account = props => {
    const auth= getAuth();
    return (
        <View style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar.Image size={140} source={require('../assets/icon.png')} />
                    <Text style={{marginTop:10}}>{auth.currentUser.email} </Text>
                </View>
                <View style={styles.btn}>
                    <Button 
                        title="Wyloguj" 
                        onPress={() => {signOut(auth)}}
                        backgroundColor={'#DA0037'}
                        width={200}
                        height={30}
                        borderRadius={25}
                        fontColor={'white'}
                    />
                </View>    	
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FE7E6D',
        alignItems:'center',
        justifyContent:'space-between'
    },
    avatar:{
        alignItems:'center',
        marginTop:50,
    },

    btn:{
        marginBottom:'20%'
    }
})

export default Account;