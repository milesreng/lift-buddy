import { React, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Colors from '../utilities/Color'
import baseStyles from '../styles/BaseStyles'
import homeStyles from '../styles/HomeStyles'
import formStyles from '../styles/FormStyles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

const url = 'http://10.197.208.113:5001/api/users'

const HomeScreen = ({ route, navigation }) => {
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('accessToken')
      if (token) navigation.navigate('dashboard')
    }

    checkLogin()
}, [])

  return (
    <View style={[baseStyles.lightMode, homeStyles.homeView]}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerText}>
          Lift Buddy
        </Text>
      </View>
      <View style={homeStyles.navContainer}>
        <Pressable title='log in' style={[formStyles.formButton, formStyles.formSubmitButton]}
          onPress={() => navigation.navigate('login')}>
            <Text style={formStyles.formButtonText}>Log in</Text>
          </Pressable>
        <Pressable title='create an account' style={[formStyles.formButton, formStyles.formElseButton]}
          onPress={() => navigation.navigate('register')}>
            <Text style={formStyles.formButtonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default HomeScreen