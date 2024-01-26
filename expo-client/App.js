import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import baseStyle from './styles/BaseStyles'

import HomeScreen from './screens/HomeScreen'
import DashboardScreen from './screens/DashboardScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import TemplateScreen from './screens/TemplateScreen'
import AccountScreen from './screens/AccountScreen'
import WorkoutScreen from './screens/WorkoutScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={{title: 'Home'}} />
        <Stack.Screen
          name='dashboard'
          component={DashboardScreen}
          options={{title: 'Dashboard'}} />
        <Stack.Screen
          name='login'
          component={LoginScreen}
          options={{title: 'Log in'}} />
        <Stack.Screen
          name='register'
          component={RegisterScreen}
          options={{title: 'Register'}} />
        <Stack.Screen
          name='account'
          component={AccountScreen}
          options={{title: 'Account'}} />
        <Stack.Screen
          name='templates'
          component={TemplateScreen}
          options={{title: 'Templates'}} />
        <Stack.Screen
          name='workouts'
          component={WorkoutScreen}
          options={{title: 'Workouts'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
