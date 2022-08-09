import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Screens
import SplashScreen from './SplashScreen';
import ViewController from './ViewController';
import LoginScreen from './screens/LoginScreen';
import AnimeDetails from './screens/AnimeDetails';

export default function App() {

  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  const SignedInStack = () => {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="SplashScreen" component={SplashScreen}/>
          <Stack.Screen name="ViewController" component={ViewController} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AnimeDetails" component={AnimeDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return  <SignedInStack />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
