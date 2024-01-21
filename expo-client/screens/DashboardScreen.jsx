import { React, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const url = 'http://10.197.208.113:5001/api/users'

const DashboardScreen = ({ navigation, route }) => {
  const [user, setUser] = useState()


  return (
    <View>
      <Text>This is {route.params.user.firstname} dashboard</Text>
    </View>
  )
}

export default DashboardScreen