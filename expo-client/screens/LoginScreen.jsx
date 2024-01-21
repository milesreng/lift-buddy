import React from 'react'
import { View, Text, TextInput } from 'react-native'

import baseStyle from '../styles/BaseStyles'
import formStyle from '../styles/FormStyles'

const LoginScreen = ({ navigation }) => {
  return (
    <View style={[baseStyle.lightMode, formStyle.formContainer]}>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='email' />
      </View>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='password'
          secureTextEntry />  
      </View>
    </View>
  )
}

export default LoginScreen