import {StyleSheet,Text, View, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get("screen").width

export const LessonBox = (props)=> { 

    return(
        <View style={{height:'78%', alignItems:'center',}}>
            <FlatList 
                data={props.rules}
                keyExtractor={({_,index}) => {index}}
                horizontal={true}
                pagingEnabled={true}
                initialScrollIndex={props.i}
                onEndReachedThreshold={0.1}
                getItemLayout={(_, index) => ({
                    length: WIDTH*0.9 + 40,
                    offset: (WIDTH*0.9 + 40) * (index), 
                    index,
                })}
                scrollToIndex={props.i}
                onScrollEndDrag={(x)=>{console.log(x.nativeEvent.contentOffset)}}
                renderItem={({item,index})=>{
                    return(
                    <View key={index} style={{height:440, padding:20}}>
                        <Shadow distance={3}>
                            <View style={[styles.box, {borderRadius:25}]}>
                                <View style={styles.desc}>
                                    <Text>{item.Opis}</Text>
                                </View>
                            </View>
                        </Shadow>
                    </View>
                    )
                }}
            />
            <View style={styles.positios}>
                {props.rules.map((item,index)=>(    
                    <View style={[styles.dotPosition, {width: index == props.i ? 20 : 15, height: index == props.i ? 20 : 15}]} />
                ))}
            </View>
            <View style={styles.actionBtn}>
					<TouchableOpacity onPress={props.callBack.undo}>
						<Ionicons name='ios-arrow-undo-circle-sharp' size={60} color={"#2F3A8F"}/>
					</TouchableOpacity>

					<TouchableOpacity onPress={props.callBack.redo}>
						<Ionicons name='ios-arrow-redo-circle-sharp' size={60} color={"#2F3A8F"}/>
					</TouchableOpacity>
				</View>
        </View>
    )}

const styles = StyleSheet.create({
    box:{
        width:WIDTH*0.9,
        height:400,
        backgroundColor:'#CCD1E4',
    },
    desc:{
        width:WIDTH*0.9,
        alignItems:'center',
        justifyContent:'center',
        padding:20,
        flex:2
    },

    positios:{
        width:'100%',
        height:'7%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },

    dotPosition:{
        width:15,
        height:15,
        borderRadius:50,
        backgroundColor:'#FE7E6D',
        borderWidth:3,
        borderColor:'#000',
        margin:5
    },

    actionBtn:{
		width:'90%',
		marginTop:25,
		height:90,
		flexDirection:'row',
		justifyContent:'space-evenly',
		alignItems:'center'
	}
})