import { View,Text, Button, TouchableOpacity,Animated, Platform } from 'react-native';

export default function TopBar({ state, descriptors, navigation, position }){
    return (
        <View style={{ flexDirection: 'row', paddingTop: Platform.OS === 'android' ? 30 : 0}}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
        
                const isFocused = state.index === index;
        
                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
        
                  if (!isFocused && !event.defaultPrevented) {
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
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
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ flex: 1 }}
                  >
                    <Animated.Text>
                      {label}
                    </Animated.Text>
                  </TouchableOpacity>
                );
            })}
        </View>
    );
}
