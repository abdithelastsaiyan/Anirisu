import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
// Screens
import SplashScreen from "./SplashScreen";
import ViewController from "./ViewController";
import LoginScreen from "./screens/LoginScreen";
import AnimeDetails from "./screens/AnimeDetails";
import AnimeSearch from "./screens/AnimeSearch";
import Chat from "./screens/Chat";
import NewsLetterDetails from "./screens/viewModels/NewsLetterDetails";

export default function App() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  const SignedInStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="ViewController" component={ViewController} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="AnimeDetails"
            component={AnimeDetails}
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="AnimeSearch"
            component={AnimeSearch}
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="NewsLetterDetails"
            component={NewsLetterDetails}
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return <SignedInStack />;
}
