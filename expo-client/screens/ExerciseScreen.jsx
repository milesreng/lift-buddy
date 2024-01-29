import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import ExerciseRecord from '../components/ExerciseRecord'

import baseStyles from '../styles/BaseStyles'
import recordStyles from '../styles/RecordStyles'

const url = 'http://10.197.208.113:5001/api/exercises'

const ExerciseScreen = () => {
  const [exercises, setExercises] = useState([])
  const [category, setCategory] = useState()

  useEffect(() => {
    const getExercises = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setExercises(response.data)
        console.log(exercises)
      } catch (e) {
        console.error(e.response.data)
      }
    }

    getExercises()
  }, [])

  return (
    <View style={[baseStyles.screenContainer, baseStyles.lightMode]}>
      <Text style={baseStyles.headerText}>Exercises</Text>
      <ScrollView style={recordStyles.scrollContainer}>
        {exercises.map((exercise, i) => (
            <ExerciseRecord key={i} exercise={exercise} lastExercise={i === 0 ? null : exercises[i - 1]} />
          ))}
      </ScrollView>
    </View>  
  )
}

export default ExerciseScreen