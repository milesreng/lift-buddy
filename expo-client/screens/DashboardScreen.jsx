import { React, useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const url = 'http://10.197.208.113:5001/api/users'

const DashboardScreen = ({ navigation, route }) => {
  const [user, setUser] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
      const getUser = async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken')

          const response = await axios.get(url, {
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

  return (
    <View>
      {user && (
        <View>
          <Text>{user.firstname}</Text>
          <Button title='view my templates'
            onPress={() => navigation.navigate('templates')} />
        </View>
      )}
    </View>
  )
}

export default DashboardScreen