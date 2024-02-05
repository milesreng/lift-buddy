import { React, useContext, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

import baseStyles from '../styles/BaseStyles'
import formStyles from '../styles/FormStyles'
import Colors from '../utilities/Color'

const baseUrl = `${process.env.EXPRESS_URL}/auth/login`

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { signIn } = useContext(AuthContext)

  const handleLogin = async () => {
    try {
      const response = await axios.post(baseUrl, { email, password })
      await AsyncStorage.setItem('accessToken', response.data.accessToken)
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken)
      signIn()
    } catch (e) {
      console.error(e)
    }
  }

  const handleForgotPassword = () => {
    // handle forgot password
  }

  return (
    <View style={[baseStyles.lightMode, baseStyles.screenContainer]}>
      <View style={formStyles.formContainer}>
        <Text style={baseStyles.headerText}>Login</Text>
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
    </View>
  )
}

export default LoginScreen