import { React, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import Colors from '../utilities/Color'
import baseStyles from '../styles/BaseStyles'

const url = 'http://10.197.208.113:5001/api/users'

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.data) {
          navigation.navigate('dashboard')
        }
      } catch (e) {
        console.error(e)
      }
    }
    getUser()
}, [])

  return (
    <View style={baseStyles.lightMode}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Lift Buddy
        <FontAwesomeIcon icon={faDumbbell} style={styles.headerText} />
        </Text>
      </View>
      <View style={styles.navView}>
        <Pressable title='log in' style={styles.navButton}
          onPress={() => navigation.navigate('login')}>
            <Text>Log in</Text>
          </Pressable>
        <Pressable title='create an account' style={styles.navButton}
          onPress={() => navigation.navigate('register')}>
            <Text>Register</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
  },
  headerText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24,
  },
  navView: {
    flex: 1,
    gap: 4,
  },
  navButton: {
    flex: 1,
    backgroundColor: Colors.LIGHT,
    width: '50%',
    justifyContent: 'center'
  }
})

export default HomeScreen