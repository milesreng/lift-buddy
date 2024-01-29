import { React, useEffect, useMemo, useReducer, createContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from './context/AuthContext'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faRightToBracket, faUser, faBorderTopLeft, faDumbbell, faClipboard } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

import Colors from './utilities/Color'
import baseStyle from './styles/BaseStyles'

import HomeScreen from './screens/HomeScreen'

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import TemplateScreen from './screens/TemplateScreen'
import AccountScreen from './screens/AccountScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import ExerciseScreen from './screens/ExerciseScreen'

const Tab = createBottomTabNavigator()

const urlStub = 'http://10.197.208.113:5001/api/users'

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
          isSignout: false,
          isLoading: false
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
          isLoading: false
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
        const response = await axios.get(urlStub, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })

        dispatch({ type: 'RESTORE_TOKEN', token: accessToken })
      } catch (e) {
        console.log(e)
        dispatch({ type: 'SIGN_OUT' })
      }
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
            tabBarInactiveBackgroundColor: Colors.BG_LIGHT,
            headerStyle: {
              backgroundColor: Colors.BG_LIGHT
            }
          }}>
          { state.userToken === null ? (<>
              <Tab.Screen
                name='login'
                component={LoginScreen}
                options={{
                  name: 'login',
                  headerShown: false,
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
                  headerShown: false,
                  tabBarLabel: 'Register',
                  tabBarIcon: () => (
                    <FontAwesomeIcon icon={faSquarePlus} />
                  )
              }} />
            </>) : (<>
            <Tab.Screen
              name='Dashboard'
              component={AccountScreen}
              options={{
                name: 'Dashboard',
                tabBarLabel: 'Dashboard',
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faUser} />
                )
              }} />
            <Tab.Screen
              name='Templates'
              component={TemplateScreen}
              options={{
                name: 'Templates',
                tabBarLabel: 'Templates',
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faBorderTopLeft} />
                )
              }} />
            <Tab.Screen
              name='Workouts'
              component={WorkoutScreen}
              options={{
                name: 'Workouts',
                tabBarLabel: 'Workouts',
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faClipboard} />
                )
              }} />
            <Tab.Screen
              name='Exercises'
              component={ExerciseScreen}
              options={{
                name: 'Exercises',
                tabBarLabel: 'Exercises',
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faDumbbell} />
                )
              }} />
              </>)}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}