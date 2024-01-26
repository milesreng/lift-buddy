import { React, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

import Colors from './utilities/Color'
import baseStyle from './styles/BaseStyles'

import HomeScreen from './screens/HomeScreen'
import DashboardScreen from './screens/DashboardScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import TemplateScreen from './screens/TemplateScreen'
import AccountScreen from './screens/AccountScreen'
import WorkoutScreen from './screens/WorkoutScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const urlStub = 'http://10.197.208.113:5001/api/users'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        console.log(token)
        if (token) {
          const user = await axios.get(urlStub, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        if (user) setLoggedIn(true)
        }
      } catch (e) {
        console.error(e)
        setLoggedIn(false)
      }
    }

    checkLoginStatus()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{ 
          tabBarActiveTintColor: Colors.DARK_ACCENT,
          tabBarInactiveTintColor: Colors.MID,
          tabBarInactiveBackgroundColor: Colors.BG_LIGHT
        }}>
        {loggedIn ? (<>
          <Tab.Screen
            name='home'
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home'
            }} />
          <Tab.Screen
            name='dashboard'
            component={DashboardScreen}
            options={{
              name: 'Dashboard',
              tabBarLabel: 'Dashboard'
            }} />
          <Tab.Screen
            name='account'
            component={AccountScreen}
            options={{
              tabBarLabel: 'Account'
            }} />
          <Tab.Screen
            name='templates'
            component={TemplateScreen}
            options={{
              tabBarLabel: 'Templates'
            }} />
          <Tab.Screen
            name='workouts'
            component={WorkoutScreen}
            options={{
              tabBarLabel: 'Workouts'
            }} />
        </>) : (<>
          <Tab.Screen
            name='home'
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <FontAwesomeIcon icon={faHome} />
              )
            }} />
          <Tab.Screen
            name='login'
            component={LoginScreen}
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: () => (
                <FontAwesomeIcon icon={faRightToBracket} />
              )
            }} />
          <Tab.Screen
            name='register'
            component={RegisterScreen}
            options={{
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
