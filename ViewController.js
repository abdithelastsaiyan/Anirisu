//Main react Stuff:
import React from "react";
//Navigation:
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Views:
import HomeScreen from './screens/HomeScreen'
import Search from './screens/Search'
import ChatRoom from './screens/ChatRoom'
import Settings from './screens/Settings'
// Helpers
import { Icon } from "react-native-elements";
import { createGlobalState } from "react-hooks-global-state";

// Variablen
const Tab = createBottomTabNavigator();
// --> Global
const { setGlobalState, useGlobalState } = createGlobalState({
    darkmode: false
})

const TabNavigator = () => {
  
    const darkmode = useGlobalState('darkmode')

    return (
      <Tab.Navigator screenOptions={{tabBarShowLabel: false, tabBarStyle: {backgroundColor: darkmode ? '#fff' : '#aaa'}}}>
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Icon 
                        name='home'
                        type='antdesign'
                        color={ focused ? '#f00' : '#000'}
                    />
                )
            }}
        />
        <Tab.Screen 
            name="Search" 
            component={Search} 
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Icon 
                        name='search'
                        type='ionicons'
                        color={ focused ? '#f00' : '#000'}
                    />
                )
            }}
        />
        <Tab.Screen 
            name="ChatRoom" 
            component={ChatRoom} 
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Icon 
                        name='chatbubbles-outline'
                        type='ionicon'
                        color={ focused ? '#f00' : '#000'}
                    />
                )
            }}
        />
        <Tab.Screen 
            name="Settings" 
            component={Settings} 
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Icon 
                        name='person-circle-outline'
                        type='ionicon'
                        color={ focused ? '#f00' : '#000'}
                    />
                )
            }}
        />
      </Tab.Navigator>
    )
};

const ViewController = () => {

    return <TabNavigator />

}

export default ViewController
export { setGlobalState, useGlobalState }