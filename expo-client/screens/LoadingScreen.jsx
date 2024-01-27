import React from 'react'
import { View, Text } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={{ backgroundColor: '#aaa', height: '100%', padding: 120 }}>
      <Text style={{ flex: 1, fontSize: 24 }}>LOADING</Text>
    </View>
  )
}

export default LoadingScreen