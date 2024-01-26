import { React, useState, useEffect } from 'react'
import { View, Text, Modal, Pressable, StyleSheet, TextInput } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../utilities/Color'

const urlStub = 'http://10.197.208.113:5001/api/users'

const AccountScreen = () => {
  const [accessToken, setAccessToken] = useState()

  const [user, setUser] = useState()
  const [history, setHistory] = useState()
  const [viewModal, setViewModal] = useState(false)

  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        setAccessToken(token)

        const response = await axios.get(`${urlStub}/history`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(response.data)
        setUser(response.data._doc)
        setEmail(response.data._doc.email)
        setHistory(response.data.numWorkouts)
      } catch (e) {
        console.error(e)
      }
    }
    getUser()
}, [])

const handleSetEmail = async () => {
  if (email && accessToken) {
    try {
      await axios.put(`${urlStub}/update-email`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: {
          email
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}

  return (
   <View style={styles.centeredView}>
    {user && (
      <View>
        <Text>{user.firstname} {user.lastname}</Text>
        <Text>{user.email}</Text>
        <Text>{history} workouts complete</Text>
        <Pressable onPress={() => setViewModal(true)}>
          <Text>edit profile</Text>
        </Pressable>
        <Modal
          animationType='slide'
          visible={viewModal}
          onRequestClose={() => setViewModal(false)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text>Edit Info</Text>
                  <View>
                    <TextInput 
                      placeholder={user.email}
                      onChangeText={setEmail} />
                    <Pressable
                      onPress={handleSetEmail}>
                      <Text>submit</Text>
                    </Pressable>
                    <TextInput 
                      placeholder={user.firstname}
                      onChangeText={setFirst} />
                    <TextInput 
                      placeholder={user.lastname ? user.lastname : 'last name'}
                      onChangeText={setLast} />
                  </View>
                </View>
                <Pressable 
                  style={styles.buttonClose}
                  onPress={() => setViewModal(false)}>
                  <Text>close modal</Text>
                </Pressable>
              </View>
            </View>
        </Modal>
      </View>
    )}
   </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: Colors.BG
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.LIGHTEST,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AccountScreen