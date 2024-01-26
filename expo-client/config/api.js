import AsyncStorage from "@react-native-async-storage/async-storage"

const accessToken = await AsyncStorage.getItem('accessToken')

export default axiosConfig = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
}