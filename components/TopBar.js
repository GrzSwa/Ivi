import { View,Text, TouchableOpacity, Platform, StyleSheet, StatusBar } from 'react-native';
const SB_HEIGHT = StatusBar.currentHeight;
export default function TopBar({ state, descriptors, navigation }){
    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <Text>Zażółć gęślą jaźń</Text>
                <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
                    <Text>Logo</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnBackground}>
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
                    <Text style={[styles.btn, {textDecorationLine: isFocused ? 'underline' : 'none'}]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
            })}
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FE7E6D',
    paddingTop: Platform.OS == 'android' ? SB_HEIGHT : 0,
    height:'20%',
    justifyContent:'flex-end',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    marginBottom:-15,
    zIndex:1000,
  },
  firstRow: {
    padding:25,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  btnBackground: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  btn: {
    padding:10,
  },
});