import { React, useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import WorkoutRecord from '../components/WorkoutRecord'

import baseStyles from '../styles/BaseStyles'
import formStyles from '../styles/FormStyles'
import recordStyles from '../styles/RecordStyles'

const baseUrl = `${process.env.EXPRESS_URL}/workouts`

const WorkoutScreen = () => {
  const [user, setUser] = useState()
  const [accessToken, setAccessToken] = useState()
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        setAccessToken(token)

        const response = await axios.get(baseUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setWorkouts(response.data)

      } catch (e) {
        console.error(e)
      }
    }
    getUser()
  }, [])

  const handleCreateWorkout = async () => {
    try {
      await axios.post(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View  style={[baseStyles.screenContainer, baseStyles.lightMode]}>
      <Text style={baseStyles.headerText}>Workouts</Text>
      <View style={recordStyles.recordContainer}>
        <View style={recordStyles.record}>
          <Pressable onPress={handleCreateWorkout}>
            <Text>+ workout</Text>
          </Pressable>
        </View>
        {workouts.map((workout, i) => (
          <WorkoutRecord key={i} workout={workout} />
        ))}
      </View>
    </View>
  )
}

export default WorkoutScreen