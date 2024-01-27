import { React, useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import baseStyles from '../styles/BaseStyles'
import formStyles from '../styles/FormStyles'
import recordStyles from '../styles/RecordStyles'

const url = 'http://10.197.208.113:5001/api/workouts'

const WorkoutScreen = () => {
  const [user, setUser] = useState()
  const [accessToken, setAccessToken] = useState()
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        setAccessToken(token)

        const response = await axios.get(url, {
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
    <View  style={baseStyles.lightMode}>
      <View style={recordStyles.recordContainer}>
        <View style={recordStyles.record}>
          <Pressable onPress={handleCreateWorkout}>
            <Text>+ workout</Text>
          </Pressable>
        </View>
        {workouts.map((workout, i) => {
          const date = new Date(workout.startTime)
          return (
            <View key={i} style={recordStyles.record}>
              <Text>
              {workout.name}
              </Text>
              <Text>
              {workout.startTime}
              </Text>
              <Text>
              {workout.endTime}
              </Text>
              <Text>
              {workout.exercises.length}
              </Text>
            </View>
        )})}
      </View>
    </View>
  )
}

export default WorkoutScreen