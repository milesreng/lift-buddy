import { React, useState, useEffect } from 'react'
import { View, Text, Button, TextInput, Pressable } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import baseStyle from '../styles/BaseStyles'
import formStyles from '../styles/FormStyles'

const baseUrl = process.env.EXPRESS_URL

const DashboardScreen = ({ navigation, route }) => {
  const [user, setUser] = useState()

  useEffect(() => {
      const getUser = async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken')

          const response = await axios.get(`${baseUrl}/users`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          setUser(response.data)
        } catch (e) {
          console.error(e)
        }
      }
      getUser()
  }, [])

  const handleCreateWorkout = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      const response = await axios.post(`${baseUrl}/workouts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={baseStyle.lightMode}>
      {user && (
        <View>
          <Text>Hi, {user.firstname}!</Text>
          <Pressable style={[formStyles.formButton, formStyles.formSubmitButton]}
            onPress={handleCreateWorkout}>
            <Text style={formStyles.formButtonText}>+ create workout</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default DashboardScreen