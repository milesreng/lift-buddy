import React from 'react'
import { View, Text } from 'react-native'

const DashboardScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>This is {route.params.name} dashboard</Text>
    </View>
  )
}

export default DashboardScreen