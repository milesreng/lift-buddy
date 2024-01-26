import { React, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const url = 'http://10.197.208.113:5001/api/workouts'

const WorkoutScreen = () => {
  const [user, setUser] = useState()
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')

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

workouts.forEach(workout => {
  console.log(workout.name)
})

  return (
    <View>{workouts.map((workout, i) => {
      const date = new Date(workout.startTime)
      return (
        <View key={i}>
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
    )})}</View>
  )
}

export default WorkoutScreen