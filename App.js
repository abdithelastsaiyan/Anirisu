import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Screens
import ViewController from './ViewController';

export default function App() {

  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  const SignedInStack = () => {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="ViewController" component={ViewController} />
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
