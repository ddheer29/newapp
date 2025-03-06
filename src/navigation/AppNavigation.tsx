import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import About from '../screens/About'
import ContactUs from '../screens/ContactUs'
import NotificationScreen from '../screens/NotificationScreen'
import HomeScreen from '../screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen'
import LandingScreen from '../screens/LandingScreen'
import ChatListScreen from '../screens/ChatListScreen'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors, screenHeight } from '../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ChatSpecificScreen from '../screens/ChatSpecificScreen'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()




const AppNavigation = () => {

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            paddingTop: Platform.OS === 'ios' ? RFValue(8) : RFValue(12),
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            // backgroundColor: 'transparent',
            height: Platform.OS === 'android' ? 90 : 90,
            borderTopWidth: 0,
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#447777',
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'ChatListScreen') {
              iconName = 'chatbubbles';
            } else if (route.name === 'NotificationScreen') {
              iconName = 'globe-outline';
            } else if (route.name === 'ContactUs') {
              iconName = 'call-outline';
            } else if (route.name === 'About') {
              iconName = 'settings-outline';
            }

            const customizeSize = RFValue(20);
            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? Colors.primary : 'gray'}
              />
            );
          },
        })}
        initialRouteName='ChatListScreen'
      >
        <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
        <Tab.Screen name="ChatListScreen" component={ChatListScreen} />
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: () => {
              return (
                <TouchableOpacity activeOpacity={0.5} style={styles.customMiddleButton}>
                  <AntDesign
                    name='plus'
                    size={RFValue(20)}
                    color='#fff'
                  />
                </TouchableOpacity>
              );
            },
            headerShown: false,
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
            },
          }}
        />
        <Tab.Screen name="ContactUs" component={ContactUs} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="ChatSpecificScreen" component={ChatSpecificScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({
  customMiddleButton: {
    backgroundColor: Colors.primary,
    borderRadius: 60,
    // padding: 8,
    shadowColor: '#666',
    elevation: 5,
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 8,
    bottom: screenHeight * 0.030,
    width: RFValue(48),
    height: RFValue(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
})