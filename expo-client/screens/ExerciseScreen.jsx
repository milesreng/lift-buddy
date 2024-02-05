import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dropdown } from 'react-native-element-dropdown'
import categories from '../utilities/Categories'

import ExerciseRecord from '../components/ExerciseRecord'

import baseStyles from '../styles/BaseStyles'
import recordStyles from '../styles/RecordStyles'

const baseUrl = `${process.env.EXPRESS_URL}/exercises`

const ExerciseScreen = () => {
  const [accessToken, setAccessToken] = useState()
  const [exercises, setExercises] = useState([])
  const [category, setCategory] = useState()

  useEffect(() => {
    const getExercises = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        setAccessToken(token)

        const response = await axios.get(baseUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setExercises(response.data)
      } catch (e) {
        console.error(e.response.data)
      }
    }

    getExercises()
  }, [])

  const renderLabel = () => {
    if (category) {
      return (
        <Text>Category</Text>
      )
    }

    return null
  }

  const handleFilterExercises = async () => {
    if (category !== '') {
      try {
        const response = axios.get(`${url}/${category}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })

        if (response.data) {
          setExercises(response.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <View style={[baseStyles.screenContainer, baseStyles.lightMode]}>
      <Text style={baseStyles.headerText}>Exercises</Text>
      <Dropdown
        data={categories}
        labelField="label"
        valueField="value"
        onChange={(item) => {
          setCategory(item.value)
          handleFilterExercises()
        }}
        />
      <ScrollView style={recordStyles.scrollContainer}>
        {exercises.map((exercise, i) => (
            <ExerciseRecord key={i} exercise={exercise} lastExercise={i === 0 ? null : exercises[i - 1]} />
          ))}
      </ScrollView>
    </View>  
  )
}

export default ExerciseScreen