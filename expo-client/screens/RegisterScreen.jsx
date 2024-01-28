import { React, useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import validator from 'validator'

import baseStyles from '../styles/BaseStyles'
import formStyles from '../styles/FormStyles'

const url = 'http://10.197.208.113:5001/api/auth/register'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState()
  const [firstName, setFirstName] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [validEmail, setValidEmail] = useState(true)
  const [passwordMatch, setPasswordMatch] = useState(null)

  const { signUp } = useContext(AuthContext)

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
  }, [password, confirmPassword])


  const handleRegister = async () => {
    try { 
      if (username && firstName && email && password && passwordMatch) {
        const user = {
          username,
          firstName,
          email,
          password
        }
        console.log(username)
        const response = await axios.post(url, user)
        if (response.data) {
          alert('your account has been successfully registered')
          signUp()
        }
      }
    } catch (e) {
      console.error(e.response.data)
    }
  }

  return (
    <View style={[baseStyles.lightMode, baseStyles.screenContainer]}>
      <View style={formStyles.formContainer}>
        <Text style={baseStyles.headerText}>Register</Text>
        <View>
          <TextInput 
            style={formStyles.formInput}
            placeholder='username'
            onChangeText={setUsername} />
        </View>
        <View>
          <TextInput 
            style={formStyles.formInput}
            placeholder='first name'
            onChangeText={setFirstName} />
        </View>
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
        <View>
          <TextInput 
            style={[formStyles.formInput, confirmPassword === '' ? '' : (passwordMatch ? formStyles.passwordMatchInput : formStyles.passwordMismatchInput)]}
            placeholder='confirm password'
            secureTextEntry
            onChangeText={setConfirmPassword} />  
        </View>
        <Text>
        {confirmPassword === '' ? '' : (passwordMatch ? '' : 'Your passwords do not match.')}
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
    </View>
  )
}

export default RegisterScreen