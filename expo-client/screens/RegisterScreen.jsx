import { React, useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'

import baseStyle from '../styles/BaseStyles'
import formStyles from '../styles/FormStyles'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordMatch, setPasswordMatch] = useState(false)

  const handleRegister = () => {

  }

  return (
    <View style={[baseStyle.lightMode, formStyles.formContainer]}>
      <View>
        <TextInput 
          style={formStyles.formInput}
          placeholder='username'
          onChange={text => setUsername(text)} />
      </View>
      <View>
        <TextInput 
          style={formStyles.formInput}
          placeholder='email'
          onChange={text => setEmail(text)} />
      </View>
      <View>
        <TextInput 
          style={formStyles.formInput}
          placeholder='password'
          secureTextEntry
          onChange={text => setPassword(text)} />  
      </View>
      <View>
        <TextInput 
          style={formStyles.formInput}
          placeholder='confirm password'
          secureTextEntry
          onChange={text => setConfirmPassword(text)} />  
      </View>
      <Text>
      {passwordMatch ? 'passwords match' : 'passwords do not match'}
      </Text>
      <TouchableOpacity onPress={handleRegister} style={[formStyles.formButton, formStyles.formSubmitButton]}>
          <Text style={formStyles.formButtonText}>register</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>--- OR ---</Text>
      <TouchableOpacity style={[formStyles.formButton, formStyles.formElseButton]}
        onPress={() => navigation.navigate('login')}>
          <Text style={formStyles.formButtonText}>log in</Text>
        </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen