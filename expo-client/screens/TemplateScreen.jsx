import { React, useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import baseStyles from '../styles/BaseStyles'
import recordStyles from '../styles/RecordStyles'

const baseUrl = `${process.env.EXPRESS_URL}/templates`

const TemplateScreen = () => {
  const [user, setUser] = useState()
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')

        const response = await axios.get(baseUrl, {
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

  const handleCreateTemplate = async () => {
    try {

    } catch (e) {

    }
  }

  return (
    <View style={[baseStyles.lightMode, baseStyles.screenContainer]}>
      <Text style={baseStyles.headerText}>Templates</Text>
      {templates && (
        <View>
          <View style={recordStyles.recordContainer}>
            <View style={recordStyles.record}>
              <Pressable onPress={handleCreateTemplate}>
                <Text>+ template</Text>
              </Pressable>
            </View>
            {templates.map((template, i) => (
              <View key={i} style={recordStyles.record}>
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