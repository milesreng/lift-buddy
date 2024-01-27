import { React, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faRightToBracket, faUser, faBorderTopLeft, faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

import Colors from './utilities/Color'
import baseStyle from './styles/BaseStyles'

import HomeScreen from './screens/HomeScreen'

import DashboardScreen from './screens/DashboardScreen'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import TemplateScreen from './screens/TemplateScreen'
import AccountScreen from './screens/AccountScreen'
import WorkoutScreen from './screens/WorkoutScreen'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const urlStub = 'http://10.197.208.113:5001/api/users'

export default function App() {
  const [accessToken, setAccessToken] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const acessToken = await AsyncStorage.getItem('accessToken')
        console.log(acessToken)
        setAccessToken(acessToken)
        if (user) setLoggedIn(true)
      } catch (e) {
        console.error(e)
        setLoggedIn(false)
      }

    checkLoginStatus()
  }}, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{ 
          tabBarActiveTintColor: Colors.DARK_ACCENT,
          tabBarInactiveTintColor: Colors.MID,
          tabBarInactiveBackgroundColor: Colors.BG_LIGHT
        }}>
        { accessToken === null ? (<>
          <Tab.Screen
            name='dashboard'
            component={DashboardScreen}
            options={{
              name: 'dashboard',
              tabBarLabel: 'Dashboard',
              tabBarIcon: () => (
                <FontAwesomeIcon icon={faHome} />
              )
            }} />
          <Tab.Screen
            name='templates'
            component={TemplateScreen}
            options={{
              name: 'templates',
              tabBarLabel: 'Templates',
              tabBarIcon: () => (
                <FontAwesomeIcon icon={faBorderTopLeft} />
              )
            }} />
          <Tab.Screen
            name='workouts'
            component={WorkoutScreen}
            options={{
              name: 'workouts',
              tabBarLabel: 'Workouts',
              tabBarIcon: () => (
                <FontAwesomeIcon icon={faDumbbell} />
              )
            }} />
          <Tab.Screen
            name='account'
            component={AccountScreen}
            options={{
              name: 'account',
              tabBarLabel: 'Account',
              tabBarIcon: () => (
                <FontAwesomeIcon icon={faUser} />
              )
            }} />
            </>) : (<>
            <Tab.Screen
            name='home'
            component={HomeScreen}
            options={{
              name: 'home',
              tabBarLabel: 'Home',
              tabBarButton: () => null,
              tabBarIcon: () => (
                <FontAwesomeIcon icon={faHome} />
              )
            }} />
            <Tab.Screen
              name='login'
              component={LoginScreen}
              options={{
                name: 'login',
                tabBarLabel: 'Login',
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faRightToBracket} />
                )
              }} />
            <Tab.Screen
              name='register'
              component={RegisterScreen}
              options={{
                name: 'register',
                tabBarLabel: 'Register',
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faSquarePlus} />
                )
            }} />
          </>)}
      </Tab.Navigator>
    </NavigationContainer>
  )
}
