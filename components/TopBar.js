import { View,Text, TouchableOpacity} from 'react-native';
import { TopBarStyle } from '../Style';
import { Ionicons } from '@expo/vector-icons';
import { CustomText } from './CustomText';


export default function TopBar({ state, descriptors, navigation }){
    return (
        <View style={TopBarStyle.container}>
            <View style={TopBarStyle.firstRow}>
                <Text>Zażółć gęślą jaźń</Text>
                <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
					<Ionicons name='menu' size={30} color={"#000"}/>
                </TouchableOpacity>
            </View>
            <View style={TopBarStyle.btnBackground}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =  options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;
        
                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
        
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate({ name: route.name, merge: true });
                  }
                };
        
                const onLongPress = () => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                };
        
                return (
                  <TouchableOpacity
                    key={route.name}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                  >
                    <CustomText title={label} underlineStyle={[isFocused ? TopBarStyle.btnUnderline : TopBarStyle.btn]}/>

                  </TouchableOpacity>
                );
            })}
        </View>
    </View>
    );
}

/*const Styles = StyleSheet.create({
  container: {
    backgroundColor:'#FE7E6D',
    paddingTop: Platform.OS == 'android' ? SB_HEIGHT : 0,
    height:'20%',
    justifyContent:'flex-end',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    marginBottom:-15,
    zIndex:1000,
    shadowColor: "#000",
    shadowOffset:{
    width: 0,
    height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  firstRow: {
    padding:25,
    flexDirection:'row',
    justifyContent:'space-between',
	alignItems:'center',
  },
  btnBackground: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
	paddingBottom:10
  },
  btn:{
	padding:2
  },

  btnUnderline:{
	width:20,
	height:3,
	backgroundColor:'#000',
	borderRadius:50,
	marginTop:2
  }
});*/