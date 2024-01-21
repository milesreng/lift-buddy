import React from 'react'
import { View, Text, Button } from 'react-native'

import baseStyle from '../styles/BaseStyles'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={baseStyle.lightMode}>
      <Text>hello</Text>
      <Button title='go to dashboard'
        onPress={() => navigation.navigate('dashboard', {name: 'Miles'})} />
      <Button title='log in'
        onPress={() => navigation.navigate('login')} />
    </View>
  )
}

export default HomeScreen