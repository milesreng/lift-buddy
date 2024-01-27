import { React, useEffect, useMemo, useReducer, createContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const Tab = createBottomTabNavigator()

const urlStub = 'http://10.197.208.113:5001/api/users'

export const AuthContext = createContext()

export default function App() {

  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          userToken: action.token,
          isSignout: false
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null
        };
    }
  }, {
    isLoading: true,
    isSignout: false,
    userToken: null
  })

  useEffect(() => {
    const checkLoginStatus = async () => {
      let accessToken;
      try {
        accessToken = await AsyncStorage.getItem('accessToken')
      } catch (e) {
        console.error(e)
      }
      dispatch({ type: 'RESTORE_TOKEN', token: accessToken })
    }
    
    checkLoginStatus()
  }, [])

  const authContext = useMemo(() => ({
    signIn: async () => {
      let accessToken = await AsyncStorage.getItem('accessToken')

      dispatch({ type: 'SIGN_IN', token: accessToken })
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async () => {
      let accessToken = await AsyncStorage.getItem('accessToken')

      dispatch({ type: 'SIGN_IN', token: accessToken })
    }
  }))

  if (state.isLoading) {
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider value={authContext}>  
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={{ 
            tabBarActiveTintColor: Colors.DARK_ACCENT,
            tabBarInactiveTintColor: Colors.MID,
            tabBarInactiveBackgroundColor: Colors.BG_LIGHT
          }}>
          { state.userToken === null ? (<>
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
            </>) : (<>
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
              </>)}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}