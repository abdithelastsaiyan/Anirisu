import { Dimensions, SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';

const Screen = {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    safeWidth: SafeAreaView.width,
    safeHeight: SafeAreaView.length,

}
export default Screen
export { safeArea }

const safeArea = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});