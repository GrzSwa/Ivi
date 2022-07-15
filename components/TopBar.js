import { View,Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';

export default function TopBar({ state, descriptors, navigation }){
    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <Text>Napis</Text>
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
    backgroundColor:'lime',
    paddingTop: Platform.OS == 'android' ? 30 : 0,
    height:'17%',
    justifyContent:'flex-end',
  },
  firstRow: {
    backgroundColor:'red',
    padding:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  btnBackground: {
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  btn: {
    backgroundColor:'gold',
    padding:10,
  },
});