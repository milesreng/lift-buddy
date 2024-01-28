import { React, useState, useEffect, useContext } from 'react'
import { View, Text, Modal, Pressable, StyleSheet, TextInput, Image } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../context/AuthContext'

import Colors from '../utilities/Color'
import baseStyles from '../styles/BaseStyles'
import accountStyles from '../styles/AccountStyles'
import formStyles from '../styles/FormStyles'

const urlStub = 'http://10.197.208.113:5001/api/users'

const AccountScreen = ({ navigation }) => {
  const [accessToken, setAccessToken] = useState()

  const [user, setUser] = useState()
  const [history, setHistory] = useState()
  const [viewModal, setViewModal] = useState(false)

  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')

  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    getUser()
}, [])

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      setAccessToken(token)

      const response = await axios.get(`${urlStub}/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setUser(response.data._doc)
      setEmail(response.data._doc.email)
      setHistory(response.data.numWorkouts)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSetEmail = async () => {
    if (email && accessToken) {
      try {
        const data = {
          email
        }

        await axios.put(`${urlStub}/update-email`, data, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })

        setViewModal(false)
        alert('email has been changed successfully')
        getUser()
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    signOut()
  }

  return (
   <View style={[baseStyles.lightMode, baseStyles.screenContainer]}>
    <Text style={baseStyles.headerText}>Dashboard</Text>
    {user && (
      <View>
        <View style={accountStyles.profileContainer}>
          <Image 
            style={accountStyles.profileImage}
            source={require('../assets/avatar-default.jpg')} />
          <View style={accountStyles.profileSummary}>
            <Text style={accountStyles.profileSummaryText}>{user.firstname} {user.lastname}</Text>
            <Text style={accountStyles.profileSummaryText}>{user.email}</Text>
            <Pressable onPress={() => setViewModal(true)}>
              <Text>edit profile</Text>
            </Pressable>
          </View>
        </View>
        <Text>{history} workouts complete</Text>
        <Modal
          animationType='slide'
          visible={viewModal}
          onRequestClose={() => setViewModal(false)}>
            <View style={accountStyles.centeredView}>
              <View style={accountStyles.modalView}>
                <View style={accountStyles.modalButtonsContainer}>
                  <Text style={baseStyles.headerText}>Edit Info</Text>
                  <Pressable 
                    style={[accountStyles.buttonClose, accountStyles.button]}
                    onPress={() => setViewModal(false)}>
                    <Text style={accountStyles.buttonCloseText}>X</Text>
                  </Pressable>
                </View>
                <View>
                  <View style={formStyles.accountFormContainer}>
                    <Text style={formStyles.formInputLabel}>First Name</Text>
                    <TextInput 
                      style={formStyles.formInput}
                      placeholder={user.firstname}
                      onChangeText={setFirst} />
                    <Text style={formStyles.formInputLabel}>Last Name</Text>
                    <TextInput 
                      style={formStyles.formInput}
                      placeholder={user.lastname ? user.lastname : ''}
                      onChangeText={setLast} />
                    <Text style={formStyles.formInputLabel}>Email</Text>
                    <TextInput 
                      style={formStyles.formInput}
                      placeholder={user.email}
                      onChangeText={setEmail} />
                    {/* <Pressable
                      onPress={handleSetEmail}>
                      <Text>submit</Text>
                    </Pressable> */}
                  </View>
                </View>
                <View style={accountStyles.modalButtonsContainer}>
                  <Pressable onPress={handleLogout} style={[accountStyles.buttonLogout, accountStyles.button]}>
                    <Text style={accountStyles.buttonText}>log out</Text>
                  </Pressable>
                  <Pressable style={[accountStyles.buttonSubmit, accountStyles.button]}>
                    <Text style={accountStyles.buttonText}>submit changes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
        </Modal>
      </View>
    )}
   </View>
  )
}

export default AccountScreen