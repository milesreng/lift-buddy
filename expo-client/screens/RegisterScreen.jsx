import { React, useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'

import baseStyle from '../styles/BaseStyles'
import formStyle from '../styles/FormStyles'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordMatch, setPasswordMatch] = useState(false)

  const handleRegister = () => {

  }

  return (
    <View style={[baseStyle.lightMode, formStyle.formContainer]}>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='username'
          onChange={text => setUsername(text)} />
      </View>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='email'
          onChange={text => setEmail(text)} />
      </View>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='password'
          secureTextEntry
          onChange={text => setPassword(text)} />  
      </View>
      <View>
        <TextInput 
          style={formStyle.formInput}
          placeholder='confirm password'
          secureTextEntry
          onChange={text => setConfirmPassword(text)} />  
      </View>
      <Text>
      {passwordMatch ? 'passwords match' : 'passwords do not match'}
      </Text>
      <TouchableOpacity onPress={handleRegister}>
          <Text>register</Text>
      </TouchableOpacity>
      <Button title='i already have an account'
        onPress={() => navigation.navigate('login')} />
    </View>
  )
}

export default RegisterScreen