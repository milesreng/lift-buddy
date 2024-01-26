import { React, useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import baseStyle from '../styles/BaseStyles'

const url = 'http://10.197.208.113:5001/api/templates'

const TemplateScreen = () => {
  const [user, setUser] = useState()
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setTemplates(response.data)

        console.log(templates)
      } catch (e) {
        console.error(e)
      }
    }
    getUser()
}, [])

  return (
    <View style={baseStyle.lightMode}>
      {templates && (
        <View>
          <View>
            {templates.map((template, i) => (
              <View key={i}>
                <Text>{template.name}</Text>
                <View>
                  {template.exercises.map((exercise, i) => {
                    <Text key={i}>
                      {exercise.name}
                    </Text>
                  })}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}

export default TemplateScreen