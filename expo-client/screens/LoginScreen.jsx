import { React, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import baseStyle from '../styles/BaseStyles'
import formStyle from '../styles/FormStyles'

const url = 'http://10.197.208.113:5001/api/auth/login'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLogin = async () => {

    try {
      console.log(url)
      const response = await axios.post(url, { email, password })
      await AsyncStorage.setItem('accessToken', response.data.accessToken)
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken)
      navigation.navigate('dashboard', {user: JSON.stringify(response.data.userInfo)})
    } catch (e) {
      console.error(e)
    }
  }

  const handleForgotPassword = () => {
    // handle forgot password
  }

  return (
    <View style={[baseStyle.lightMode, formStyle.formContainer]}>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='email'
          onChangeText={setEmail} />
      </View>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='password'
          secureTextEntry
          onChangeText={setPassword} />  
      </View>
      <TouchableOpacity onPress={handleLogin}>
          <Text>log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
          <Text>forgot password?</Text>
      </TouchableOpacity>
      <Button title='create an account'
        onPress={() => navigation.navigate('register')} />
    </View>
  )
}

export default LoginScreen