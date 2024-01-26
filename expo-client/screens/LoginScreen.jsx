import { React, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import baseStyle from '../styles/BaseStyles'
import formStyles from '../styles/FormStyles'
import Colors from '../utilities/Color'

const url = 'http://10.197.208.113:5001/api/auth/login'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLogin = async () => {
    try {
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
    <View style={[baseStyle.lightMode, formStyles.formContainer]}>
      <View>
        <TextInput 
          style={formStyles.formInput}
          placeholder='email'
          onChangeText={setEmail} />
      </View>
      <View>
        <TextInput 
          style={formStyles.formInput}
          placeholder='password'
          secureTextEntry
          onChangeText={setPassword} />  
      </View>
      <TouchableOpacity onPress={handleLogin} style={[formStyles.formButton, formStyles.formSubmitButton]}>
          <Text style={formStyles.formButtonText}>log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={formStyles.forgotPasswordText}>forgot password?</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>--- OR ---</Text>
      <TouchableOpacity style={[formStyles.formButton, formStyles.formElseButton]}
        onPress={() => navigation.navigate('register')}>
          <Text style={formStyles.formButtonText}>create an account</Text>
        </TouchableOpacity>
    </View>
  )
}

export default LoginScreen